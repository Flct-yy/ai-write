import Login from "/@/pages/login";
import { useTheme } from "/@/hooks/use-theme";
import { useForm } from "react-hook-form";
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarShortcut, MenubarSeparator } from "/@/components/navigation/menubar";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "/@/components/navigation/pagination";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "/@/components/navigation/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "/@/components/overlays/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "/@/components/overlays/alert-dialog";



function App() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="h-screen bg-background">
      <Login />
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>文件</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              新建
              <MenubarShortcut>Ctrl+N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              打开
              <MenubarShortcut>Ctrl+O</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              保存
              <MenubarShortcut>Ctrl+S</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>编辑</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              剪切
              <MenubarShortcut>Ctrl+X</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              复制
              <MenubarShortcut>Ctrl+C</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              粘贴
              <MenubarShortcut>Ctrl+V</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">10</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <div className="mt-8 px-4">
        <h2 className="text-xl font-semibold mb-4">标签页测试</h2>
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">标签页 1</TabsTrigger>
            <TabsTrigger value="tab2">标签页 2</TabsTrigger>
            <TabsTrigger value="tab3">标签页 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <div className="p-4 bg-card rounded-md">
              <h3 className="text-lg font-medium">标签页 1 内容</h3>
              <p className="mt-2">这是标签页 1 的测试内容</p>
            </div>
          </TabsContent>
          <TabsContent value="tab2">
            <div className="p-4 bg-card rounded-md">
              <h3 className="text-lg font-medium">标签页 2 内容</h3>
              <p className="mt-2">这是标签页 2 的测试内容</p>
            </div>
          </TabsContent>
          <TabsContent value="tab3">
            <div className="p-4 bg-card rounded-md">
              <h3 className="text-lg font-medium">标签页 3 内容</h3>
              <p className="mt-2">这是标签页 3 的测试内容</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-8 px-4">
        <h2 className="text-xl font-semibold mb-4">对话框测试</h2>
        <Dialog>
          <DialogTrigger className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
            打开对话框
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>对话框标题</DialogTitle>
              <DialogDescription>
                这是一个对话框测试，用于展示对话框组件的功能。
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <p>对话框内容区域，可以放置任何需要的内容。</p>
              <p className="mt-2">例如表单、图片、文本等。</p>
            </div>
            <DialogFooter>
              <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors">
                取消
              </button>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                确认
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-8 px-4">
        <h2 className="text-xl font-semibold mb-4">警告对话框测试</h2>
        <AlertDialog>
          <AlertDialogTrigger className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors">
            打开警告对话框
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>确认操作</AlertDialogTitle>
              <AlertDialogDescription>
                您确定要执行此操作吗？此操作无法撤销。
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>取消</AlertDialogCancel>
              <AlertDialogAction>确认</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default App;