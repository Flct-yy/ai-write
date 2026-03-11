import Login from "/@/pages/login";
import { Button } from "/@/components/inputs/button";
import { useTheme } from "/@/hooks/use-theme";
import { Menu, X, Save, Trash2, ExternalLink, Edit, Heart } from "lucide-react";

function App() {
  const { theme, setTheme } = useTheme();
  const handleClick = (type: string) => {
    console.log(`点击了 ${type} 按钮`);
  };
  return (
    <div className="h-screen bg-background">
      <Login />
      <button style={{ border: "2px solid #000" }} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        {theme === "dark" ? "Light" : "Dark"}
      </button>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">1. 基础用法</h3>
        <Button onClick={() => handleClick("基础默认")}>
          默认按钮
        </Button>
        <Button
          type="submit"
          onClick={() => handleClick("提交按钮")}
        >
          提交表单
        </Button>
      </section>

      {/* 2. 所有 Variant 变体演示 */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">2. 所有样式变体</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="default">默认按钮</Button>
          <Button variant="destructive">危险按钮（删除/取消）</Button>
          <Button variant="outline">轮廓按钮</Button>
          <Button variant="secondary">次要按钮</Button>
          <Button variant="ghost">幽灵按钮</Button>
          <Button variant="link">链接样式按钮</Button>
        </div>
      </section>

      {/* 3. 所有 Size 尺寸演示 */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">3. 所有尺寸变体</h3>
        <div className="flex flex-wrap gap-3 items-center">
          <Button size="sm">小尺寸 (sm)</Button>
          <Button size="default">默认尺寸</Button>
          <Button size="lg">大尺寸 (lg)</Button>
          <Button size="icon" aria-label="菜单">
            <Menu />
          </Button>
          <Button size="icon" variant="destructive" aria-label="关闭">
            <X />
          </Button>
        </div>
      </section>

      {/* 4. 带图标的按钮（左/右图标） */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">4. 带图标的按钮</h3>
        <div className="flex flex-wrap gap-3">
          {/* 图标在左侧 */}
          <Button variant="default">
            <Save className="mr-2" /> 保存
          </Button>
          <Button variant="destructive">
            <Trash2 className="mr-2" /> 删除
          </Button>
          {/* 图标在右侧 */}
          <Button variant="link">
            查看详情 <ExternalLink className="ml-2" />
          </Button>
          {/* 仅图标（无文字）- 务必加 aria-label 保证无障碍 */}
          <Button size="icon" aria-label="编辑">
            <Edit />
          </Button>
          <Button size="icon" variant="secondary" aria-label="点赞">
            <Heart />
          </Button>
        </div>
      </section>

      {/* 5. 特殊场景：禁用、自定义类名、asChild */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">5. 特殊场景</h3>
        <div className="flex flex-wrap gap-3">
          {/* 禁用状态 */}
          <Button disabled>禁用按钮</Button>
          <Button variant="destructive" disabled>禁用的危险按钮</Button>

          {/* 自定义类名（覆盖/扩展样式） */}
          <Button className="ml-2 bg-purple-600 hover:bg-purple-700">
            自定义背景色
          </Button>
          <Button
            variant="outline"
            className="rounded-full border-2 border-green-500 text-green-600"
          >
            圆角+自定义边框
          </Button>

          {/* asChild：渲染为链接（a 标签） */}
          <Button asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              跳转到 GitHub
            </a>
          </Button>

          {/* asChild：渲染为其他组件（比如路由链接） */}
          {/* 示例：React Router 的 Link */}
          {/* import { Link } from 'react-router-dom'; */}
          {/* <Button asChild>
            <Link to="/dashboard">仪表盘</Link>
          </Button> */}
        </div>
      </section>

      {/* 6. 结合表单：不同 type 的按钮 */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">6. 表单中的按钮</h3>
        <form className="flex flex-wrap gap-3 p-4 border rounded-md">
          <Button type="button" onClick={() => handleClick("普通按钮")}>
            普通按钮（type=button）
          </Button>
          <Button type="submit" variant="default">
            提交按钮（type=submit）
          </Button>
          <Button type="reset" variant="outline">
            重置按钮（type=reset）
          </Button>
        </form>
      </section>

      {/* 7. 透传原生属性：name、id、aria 属性等 */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">7. 透传原生属性</h3>
        <Button
          id="submit-btn"
          name="submit-form"
          aria-describedby="submit-help"
          title="点击提交表单"
        >
          带原生属性的按钮
        </Button>
        <p id="submit-help" className="text-sm text-gray-500">
          点击此按钮将提交您的表单数据
        </p>
      </section>
    </div>
  );
}

export default App;
