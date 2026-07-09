import { useId, useState } from "react";
import { Clock3, Play, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";

const streams = [
  {
    title: "City timelapse",
    status: "Live",
    duration: "00:12:34",
    quality: "1080p",
  },
  {
    title: "Conference keynote",
    status: "Queued",
    duration: "01:02:18",
    quality: "720p",
  },
  {
    title: "Product demo loop",
    status: "Ready",
    duration: "00:08:09",
    quality: "1080p",
  },
];

function App() {
  const inputId = useId();
  const [file, setFile] = useState<File | null>(null);

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-10">
      <section className="w-full max-w-6xl border border-border bg-card p-8 shadow-sm sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Media workspace
              </p>
              <h1 className="text-2xl font-semibold tracking-tight">Upload video</h1>
              <p className="text-sm text-muted-foreground">
                Choose a video file to send into the transcoding pipeline.
              </p>
            </div>

            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <input
                id={inputId}
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(event) => setFile(event.target.files?.[0] ?? null)}
              />

              <label
                htmlFor={inputId}
                className="flex min-h-56 cursor-pointer flex-col items-center justify-center border border-dashed border-border bg-muted/30 px-8 text-center transition-colors hover:bg-muted/50"
              >
                <Upload className="h-5 w-5 text-muted-foreground" />
                <span className="mt-3 text-sm font-medium">Click to select a video</span>
                <span className="mt-1 text-xs text-muted-foreground">
                  MP4, MOV, MKV, and other common video formats
                </span>
              </label>

              <div className="flex items-center justify-between gap-3 border border-border bg-muted/30 px-4 py-3 text-sm">
                <span className="text-muted-foreground">Selected file</span>
                <span className="truncate text-right font-medium">
                  {file ? file.name : "No file selected"}
                </span>
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={!file}>
                  Upload
                </Button>
              </div>
            </form>
          </div>

          <div className="space-y-4">
            <div className="flex items-end justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold tracking-tight">Streaming feed</h2>
                <p className="text-sm text-muted-foreground">
                  Minimal list of available streams and playback status.
                </p>
              </div>
              <span className="border border-border bg-muted/30 px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                3 streams
              </span>
            </div>

            <div className="border border-border bg-muted/20">
              <div className="flex min-h-56 items-center justify-center border-b border-border bg-muted/40 px-6">
                <div className="flex flex-col items-center gap-3 text-center">
                  <div className="flex h-16 w-16 items-center justify-center border border-border bg-card">
                    <Play className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Now playing</p>
                    <p className="text-xs text-muted-foreground">City timelapse</p>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-border">
                {streams.map((stream) => (
                  <div
                    key={stream.title}
                    className="flex items-center justify-between gap-4 px-5 py-4"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center border border-border bg-card">
                          <Play className="h-3.5 w-3.5" />
                        </span>
                        <p className="truncate text-sm font-medium">{stream.title}</p>
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Clock3 className="h-3.5 w-3.5" />
                          {stream.duration}
                        </span>
                        <span>{stream.quality}</span>
                        <span>{stream.status}</span>
                      </div>
                    </div>

                    <Button variant="outline" size="sm">
                      Watch
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;

