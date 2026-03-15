import Login from "/@/pages/login";
import { useToast } from "/@/hooks/use-toast";
import { Toaster } from "/@/components/display/toaster";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "/@/components/layout/collapsible";
import { Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption } from "/@/components/data/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "/@/components/data/chart";
import { Calendar } from "/@/components/data/calendar";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "/@/components/data/carousel";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";



function App() {
  const { toast } = useToast();

  return (
    <div className="h-screen bg-background">

      <div className="mt-8 px-4">
        <h2 className="text-xl font-semibold mb-4">日历测试</h2>
        <Calendar />
      </div>

      <div className="mt-8 px-4">
        <h2 className="text-xl font-semibold mb-4">轮播图测试</h2>
        <Carousel>
          <CarouselContent>
            <CarouselItem>
              <div className="h-64 bg-primary rounded-md flex items-center justify-center text-white font-medium">
                <img src="https://picsum.photos/1920/1080" alt="轮播图 1" />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="h-64 bg-secondary rounded-md flex items-center justify-center text-white font-medium">
                <img src="https://picsum.photos/1920/1080" alt="轮播图 2" />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="h-64 bg-destructive rounded-md flex items-center justify-center text-white font-medium">
                <img src="https://picsum.photos/1920/1080" alt="轮播图 3" />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="h-64 bg-accent rounded-md flex items-center justify-center text-white font-medium">
                <img src="https://picsum.photos/1920/1080" alt="轮播图 4" />
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div className="mt-8 px-4">
        <h2 className="text-xl font-semibold mb-4">可折叠组件测试</h2>
        <Collapsible>
          <CollapsibleTrigger className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
            点击展开/折叠内容
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 p-4 bg-card rounded-md border border-border">
            <p>这是可折叠组件的内容，点击上面的按钮可以展开或折叠此内容。</p>
            <p className="mt-2">可折叠组件常用于展示/隐藏详细信息，节省页面空间。</p>
          </CollapsibleContent>
        </Collapsible>
      </div>

      <div className="mt-8 px-4">
        <h2 className="text-xl font-semibold mb-4">Sonner 通知测试</h2>
        <div className="flex gap-4">
          <button
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            onClick={() => toast({
              title: "成功",
              description: "操作已成功完成",
              variant: "default"
            })}
          >
            显示成功通知
          </button>
          <button
            className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors"
            onClick={() => toast({
              title: "错误",
              description: "操作失败，请重试",
              variant: "destructive"
            })}
          >
            显示错误通知
          </button>
        </div>
      </div>

      <Toaster />
    </div >
  );
}

export default App;