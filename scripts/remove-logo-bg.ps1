Add-Type -AssemblyName System.Drawing

$srcPath = "public\aurafold-logo.jpg"
$dstPath = "public\aurafold-logo.png"

$src = [System.Drawing.Bitmap]::FromFile((Resolve-Path $srcPath))
$bmp = New-Object System.Drawing.Bitmap $src.Width, $src.Height, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Threshold for near-white background removal (outer area only via flood-style: any near-white)
# Preserve gold (high R/G, lower B relative) and black circle
$whiteThresh = 240
$nearWhiteMin = 230

for ($y = 0; $y -lt $src.Height; $y++) {
  for ($x = 0; $x -lt $src.Width; $x++) {
    $c = $src.GetPixel($x, $y)
    $r = [int]$c.R; $g = [int]$c.G; $b = [int]$c.B
    # Near-white / white background -> transparent
    if ($r -ge $nearWhiteMin -and $g -ge $nearWhiteMin -and $b -ge $nearWhiteMin) {
      $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
    } else {
      $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $r, $g, $b))
    }
  }
}

$bmp.Save($dstPath, [System.Drawing.Imaging.ImageFormat]::Png)
$src.Dispose()
$bmp.Dispose()
Write-Output "Wrote $dstPath"
Get-Item $dstPath | Format-List Name, Length
