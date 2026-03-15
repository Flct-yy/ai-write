import Login from "/@/pages/login";
import { useTheme } from "/@/hooks/use-theme";
import { useForm } from "react-hook-form";
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarShortcut, MenubarSeparator } from "/@/components/navigation/menubar";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "/@/components/navigation/pagination";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "/@/components/navigation/tabs";



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
    </div>
  );
}

export default App;