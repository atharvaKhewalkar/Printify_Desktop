import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Printer, Wifi, Settings, AlertCircle, CheckCircle, Palette } from "lucide-react"

const connectedPrinters = [
  {
    id: 1,
    name: "HP LaserJet Pro 1",
    model: "HP LaserJet Pro MFP M428fdw",
    status: "Online",
    connection: "WiFi",
    defaultSettings: {
      quality: "Normal",
      paperSize: "A4",
      orientation: "Portrait"
    }
  },
  {
    id: 2,
    name: "Canon ImageClass 2",
    model: "Canon imageCLASS MF445dw",
    status: "Online", 
    connection: "USB",
    defaultSettings: {
      quality: "High",
      paperSize: "A4",
      orientation: "Portrait"
    }
  },
  {
    id: 3,
    name: "Epson EcoTank 1",
    model: "Epson EcoTank ET-4760",
    status: "Offline",
    connection: "WiFi",
    defaultSettings: {
      quality: "Photo",
      paperSize: "Letter",
      orientation: "Portrait"
    }
  }
]

export function PrintingSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Printing Settings
        </h1>
        <p className="text-muted-foreground">Configure printers and default print settings</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="gradient-card border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Auto-detect Printers</h3>
                <p className="text-sm text-muted-foreground">Scan for new devices</p>
              </div>
              <Button className="gradient-primary text-white">
                <Wifi className="w-4 h-4 mr-2" />
                Scan
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Test All Printers</h3>
                <p className="text-sm text-muted-foreground">Run connectivity test</p>
              </div>
              <Button variant="outline">
                <CheckCircle className="w-4 h-4 mr-2" />
                Test
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-card border-orange-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Color Calibration</h3>
                <p className="text-sm text-muted-foreground">Adjust color profiles</p>
              </div>
              <Button variant="outline">
                <Palette className="w-4 h-4 mr-2" />
                Calibrate
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Connected Printers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-blue-600" />
            Connected Printers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {connectedPrinters.map((printer) => (
            <div key={printer.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                    <Printer className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{printer.name}</h3>
                    <p className="text-sm text-muted-foreground">{printer.model}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={printer.status === "Online" ? "secondary" : "destructive"}>
                    {printer.status === "Online" ? (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    ) : (
                      <AlertCircle className="w-3 h-3 mr-1" />
                    )}
                    {printer.status}
                  </Badge>
                  <Badge variant="outline">{printer.connection}</Badge>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Default Quality</Label>
                  <Select defaultValue={printer.defaultSettings.quality}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Normal">Normal</SelectItem>
                      <SelectItem value="High">High Quality</SelectItem>
                      <SelectItem value="Photo">Photo Quality</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Paper Size</Label>
                  <Select defaultValue={printer.defaultSettings.paperSize}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A4">A4</SelectItem>
                      <SelectItem value="Letter">Letter</SelectItem>
                      <SelectItem value="Legal">Legal</SelectItem>
                      <SelectItem value="A3">A3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Orientation</Label>
                  <Select defaultValue={printer.defaultSettings.orientation}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Portrait">Portrait</SelectItem>
                      <SelectItem value="Landscape">Landscape</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Advanced Settings
                </Button>
                <Button size="sm" className="gradient-primary text-white">
                  Save Settings
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Global Print Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Global Print Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-start printing queue</Label>
                  <p className="text-sm text-muted-foreground">Automatically process accepted jobs</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Color management</Label>
                  <p className="text-sm text-muted-foreground">Enable automatic color correction</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Duplex printing by default</Label>
                  <p className="text-sm text-muted-foreground">Use double-sided printing when possible</p>
                </div>
                <Switch />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Default printer timeout (minutes)</Label>
                <Input type="number" defaultValue="5" min="1" max="60" />
              </div>

              <div className="space-y-2">
                <Label>Max concurrent jobs</Label>
                <Input type="number" defaultValue="3" min="1" max="10" />
              </div>

              <div className="space-y-2">
                <Label>Print quality preset</Label>
                <Select defaultValue="balanced">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="speed">Speed Optimized</SelectItem>
                    <SelectItem value="balanced">Balanced</SelectItem>
                    <SelectItem value="quality">Quality Optimized</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}