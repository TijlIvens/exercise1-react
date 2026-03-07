import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw, History as HistoryIcon } from "lucide-react";
import { FC } from "react";

type HistoryProps = {
  history: number[];
  onReset: () => void;
};

export const History: FC<HistoryProps> = ({ history, onReset }) => {
  return (
    <Card className="h-full max-h-[800px] flex flex-col">
      <CardHeader className="bg-muted/30 border-b flex flex-row items-center justify-between pb-4 sticky top-0 z-10 backdrop-blur-sm">
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <HistoryIcon className="w-6 h-6 text-primary" />
          History
        </CardTitle>
        <Button
          variant="destructive"
          size="icon"
          onClick={onReset}
          className="rounded-full shadow-md hover:scale-110 transition-transform"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 custom-scrollbar">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground opacity-60 mt-12 gap-4">
            <HistoryIcon className="w-16 h-16" />
            <p className="text-lg font-medium">No rolls yet.</p>
          </div>
        ) : (
          [...history].reverse().map((num, i) => (
            <div
              key={history.length - i}
              className="flex items-center justify-between p-4 rounded-xl border-2 bg-card hover:bg-muted/50 hover:border-primary/30 transition-all shadow-sm group"
            >
              <span className="font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                Roll #{history.length - i}
              </span>
              <span className="font-black text-2xl text-primary bg-primary/10 px-4 py-1 rounded-lg">
                {num}
              </span>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};
