/**
 * Toast 钩子
 * 用于管理和显示提示框
 */
import * as React from "react";

import type { ToastActionElement, ToastProps } from "/@/components/display/toast";

/**
 * 提示框数量限制
 */
const TOAST_LIMIT = 1;

/**
 * 提示框移除延迟时间（毫秒）
 */
const TOAST_REMOVE_DELAY = 1000000;

/**
 * 提示框类型
 */
type ToasterToast = ToastProps & {
  /**
   * 提示框唯一标识
   */
  id: string;
  /**
   * 提示框标题
   */
  title?: React.ReactNode;
  /**
   * 提示框描述
   */
  description?: React.ReactNode;
  /**
   * 提示框操作按钮
   */
  action?: ToastActionElement;
};

/**
 * 操作类型
 */
const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

/**
 * 计数器，用于生成唯一 ID
 */
let count = 0;

/**
 * 生成唯一 ID
 * @returns {string} 唯一 ID
 */
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

/**
 * 操作类型
 */
type ActionType = typeof actionTypes;

/**
 * 操作
 */
type Action =
  | {
    type: ActionType["ADD_TOAST"];
    toast: ToasterToast;
  }
  | {
    type: ActionType["UPDATE_TOAST"];
    toast: Partial<ToasterToast>;
  }
  | {
    type: ActionType["DISMISS_TOAST"];
    toastId?: ToasterToast["id"];
  }
  | {
    type: ActionType["REMOVE_TOAST"];
    toastId?: ToasterToast["id"];
  };

/**
 * 状态
 */
interface State {
  toasts: ToasterToast[];
}

/**
 * 提示框超时映射
 */
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

/**
 * 添加到移除队列
 * @param {string} toastId - 提示框 ID
 */
const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

/**
 * 状态 reducer
 * @param {State} state - 当前状态
 * @param {Action} action - 操作
 * @returns {State} 新状态
 */
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case "DISMISS_TOAST": {
      const { toastId } = action;

      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
              ...t,
              open: false,
            }
            : t
        ),
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

/**
 * 监听器列表
 */
const listeners: Array<(state: State) => void> = [];

/**
 * 内存状态
 */
let memoryState: State = { toasts: [] };

/**
 * 分发操作
 * @param {Action} action - 操作
 */
function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

/**
 * 提示框属性（不含 ID）
 */
type Toast = Omit<ToasterToast, "id">;

/**
 * 创建提示框
 * @param {Toast} props - 提示框属性
 * @returns {Object} 提示框控制对象
 */
function toast({ ...props }: Toast) {
  const id = genId();

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  return {
    id: id,
    dismiss,
    update,
  };
}

/**
 * 使用提示框
 * @returns {Object} 提示框状态和方法
 */
function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  };
}

export { useToast };