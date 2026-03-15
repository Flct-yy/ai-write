import Login from "/@/pages/login";
import { useTheme } from "/@/hooks/use-theme";
import { useForm } from "react-hook-form";
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarShortcut, MenubarSeparator } from "/@/components/navigation/menubar";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "/@/components/navigation/pagination";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "/@/components/navigation/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "/@/components/overlays/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "/@/components/overlays/alert-dialog";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "/@/components/overlays/hover-card";
import { Popover, PopoverContent, PopoverTrigger } from "/@/components/overlays/popover";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "/@/components/overlays/drawer";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "/@/components/overlays/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "/@/components/overlays/tooltip";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandShortcut } from "/@/components/interaction/command";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuTrigger } from "/@/components/interaction/context-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "/@/components/interaction/dropdown-menu";
import { Toggle } from "/@/components/interaction/toggle";
import { ToggleGroup, ToggleGroupItem } from "/@/components/interaction/toggle-group";
import { Alert, AlertTitle, AlertDescription } from "/@/components/display/alert";
import { Avatar, AvatarImage, AvatarFallback } from "/@/components/display/avatar";
import { Badge } from "/@/components/display/badge";
import { Progress } from "/@/components/display/progress";
import { Skeleton } from "/@/components/display/skeleton";
import { Toaster } from "/@/components/display/toaster";
import { useToast } from "/@/hooks/use-toast";



function App() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

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

      <div className="mt-8 px-4">
        <h2 className="text-xl font-semibold mb-4">悬停卡片测试</h2>
        <HoverCard>
          <HoverCardTrigger className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
            悬停我查看详情
          </HoverCardTrigger>
          <HoverCardContent >
            <h3 className="font-medium">悬停卡片标题</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              这是一个悬停卡片测试，当鼠标悬停在触发器上时会显示此内容。
            </p>
          </HoverCardContent>
        </HoverCard>
      </div>

      <div className="mt-8 px-4">
        <h2 className="text-xl font-semibold mb-4">弹出框测试</h2>
        <Popover>
          <PopoverTrigger className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors">
            点击打开弹出框
          </PopoverTrigger>
          <PopoverContent>
            <h3 className="font-medium">弹出框标题</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              这是一个弹出框测试，点击触发器后会显示此内容。
            </p>
            <div className="mt-4">
              <button className="px-3 py-1 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm">
                确认
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="mt-8 px-4">
        <h2 className="text-xl font-semibold mb-4">抽屉测试</h2>
        <Drawer>
          <DrawerTrigger className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
            打开抽屉
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>抽屉标题</DrawerTitle>
              <DrawerDescription>
                这是一个抽屉测试，从底部滑出。
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4">
              <p>抽屉内容区域，可以放置任何需要的内容。</p>
              <p className="mt-2">例如表单、列表等。</p>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors">
                  取消
                </button>
              </DrawerClose>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                确认
              </button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>

      <div className="mt-8 px-4">
        <h2 className="text-xl font-semibold mb-4">侧边栏测试</h2>
        <Sheet>
          <SheetTrigger className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
            打开侧边栏
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>侧边栏标题</SheetTitle>
              <SheetDescription>
                这是一个侧边栏测试，从右侧滑出。
              </SheetDescription>
            </SheetHeader>
            <div className="p-4">
              <p>侧边栏内容区域，可以放置任何需要的内容。</p>
              <p className="mt-2">例如导航菜单、设置选项等。</p>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors">
                  取消
                </button>
              </SheetClose>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                确认
              </button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <div className="mt-8 px-4">
        <h2 className="text-xl font-semibold mb-4">工具提示测试</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
              悬停我查看工具提示
            </TooltipTrigger>
            <TooltipContent>
              <p>这是一个工具提示测试</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="mt-8 px-4">
        <h2 className="text-xl font-semibold mb-4">命令面板测试</h2>
        <CommandDialog>
          <DialogTrigger className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
            打开命令面板 (Ctrl+K)
          </DialogTrigger>
          <DialogContent className="overflow-hidden p-0 shadow-lg">
            <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
              <CommandInput placeholder="搜索命令..." />
              <CommandList>
                <CommandEmpty>未找到匹配的命令</CommandEmpty>
                <CommandGroup heading="常用命令">
                  <CommandItem>
                    新建文件
                    <CommandShortcut>Ctrl+N</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                    打开文件
                    <CommandShortcut>Ctrl+O</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                    保存文件
                    <CommandShortcut>Ctrl+S</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
                <CommandGroup heading="编辑命令">
                  <CommandItem>
                    剪切
                    <CommandShortcut>Ctrl+X</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                    复制
                    <CommandShortcut>Ctrl+C</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                    粘贴
                    <CommandShortcut>Ctrl+V</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </DialogContent>
        </CommandDialog>
      </div>

      <div className="mt-8 px-4">
        <h2 className="text-xl font-semibold mb-4">上下文菜单测试</h2>
        <ContextMenu>
          <ContextMenuTrigger className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
            右键点击我查看上下文菜单
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>
              新建文件
              <ContextMenuShortcut>Ctrl+N</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              打开文件
              <ContextMenuShortcut>Ctrl+O</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>
              保存文件
              <ContextMenuShortcut>Ctrl+S</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>
              退出
              <ContextMenuShortcut>Alt+F4</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>

      <div className="mt-8 px-4">
        <h2 className="text-xl font-semibold mb-4">下拉菜单测试</h2>
        <DropdownMenu>
          <DropdownMenuTrigger className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
            点击打开下拉菜单
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              新建文件
              <DropdownMenuShortcut>Ctrl+N</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              打开文件
              <DropdownMenuShortcut>Ctrl+O</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              保存文件
              <DropdownMenuShortcut>Ctrl+S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              退出
              <DropdownMenuShortcut>Alt+F4</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mt-8 px-4">
        <h2 className="text-xl font-semibold mb-4">切换按钮测试</h2>
        <div className="flex gap-4">
          <Toggle variant="default" size="default">
            默认切换按钮
          </Toggle>
          <Toggle variant="outline" size="default">
            轮廓切换按钮
          </Toggle>
          <Toggle variant="default" size="sm">
            小尺寸
          </Toggle>
          <Toggle variant="default" size="lg">
            大尺寸
          </Toggle>
        </div>
      </div>

      <div className="mt-8 px-4">
        <h2 className="text-xl font-semibold mb-4">切换按钮组测试</h2>
        <ToggleGroup type="single" defaultValue="left">
          <ToggleGroupItem value="left">
            左对齐
          </ToggleGroupItem>
          <ToggleGroupItem value="center">
            居中
          </ToggleGroupItem>
          <ToggleGroupItem value="right">
            右对齐
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="mt-8 px-4">
        <h2 className="text-xl font-semibold mb-4">警告框测试</h2>
        <div className="flex flex-col gap-4">
          <Alert>
            <AlertTitle>信息提示</AlertTitle>
            <AlertDescription>
              这是一个默认的警告框，用于显示一般信息。
            </AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertTitle>错误提示</AlertTitle>
            <AlertDescription>
              这是一个破坏性的警告框，用于显示错误信息。
            </AlertDescription>
          </Alert>
        </div>
      </div>

      <div className="mt-8 px-4">
        <h2 className="text-xl font-semibold mb-4">头像测试</h2>
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=JohnDoe" alt="用户头像" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Avatar className="h-16 w-16">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=SarahBrown" alt="用户头像" />
            <AvatarFallback>SB</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="mt-8 px-4">
        <h2 className="text-xl font-semibold mb-4">徽章测试</h2>
        <div className="flex gap-4">
          <Badge variant="default">默认徽章</Badge>
          <Badge variant="secondary">次要徽章</Badge>
          <Badge variant="destructive">危险徽章</Badge>
          <Badge variant="outline">轮廓徽章</Badge>
        </div>
      </div>

      <div className="mt-8 px-4">
        <h2 className="text-xl font-semibold mb-4">进度条测试</h2>
        <div className="flex flex-col gap-4">
          <Progress className="bg-gray-200 h-2" value={30} />
          <Progress className="bg-gray-200 h-2" value={60} />
          <Progress className="bg-gray-200 h-2" value={90} />
        </div>
      </div>

      <div className="mt-8 px-4">
        <h2 className="text-xl font-semibold mb-4">骨架屏测试</h2>
        <div className="flex flex-col gap-4">
          <Skeleton className="bg-gray-200 h-12 w-full" />
          <Skeleton className="bg-gray-200 h-8 w-3/4" />
          <Skeleton className="bg-gray-200 h-4 w-1/2" />
        </div>
      </div>

      <div className="mt-8 px-4">
        <h2 className="text-xl font-semibold mb-4">提示框测试</h2>
        <div className="flex gap-4">
          <button 
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            onClick={() => toast({
              title: "成功",
              description: "操作已成功完成",
              variant: "default"
            })}
          >
            显示成功提示
          </button>
          <button 
            className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors"
            onClick={() => toast({
              title: "错误",
              description: "操作失败，请重试",
              variant: "destructive"
            })}
          >
            显示错误提示
          </button>
        </div>
      </div>

      <Toaster />
    </div>
  );
}

export default App;