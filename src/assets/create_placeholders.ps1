# Create placeholder PNG files for missing Figma assets
$pngBytes = @(137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 1, 0, 0, 0, 1, 8, 6, 0, 0, 0, 31, 21, 196, 137, 0, 0, 0, 10, 73, 68, 65, 84, 8, 99, 99, 0, 1, 0, 0, 5, 0, 1, 13, 10, 45, 176, 0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130)

$files = @(
  'f51cc543d73d57a7ec6a7452b72d744ecc45c657.png',
  'a405f329b597be91eeb4b4ea02415753c919ddd2.png',
  '5b426e88efada297ecdec98d2b58ae7554e49c33.png',
  '5920481c5d9f82bea22cf2d117dfcaeb8e4a39c7.png',
  '0af8b90ac57008e9f3c2d27238a5b8e1f3b85480.png'
)

foreach ($file in $files) {
  [System.IO.File]::WriteAllBytes((Join-Path $PSScriptRoot $file), [byte[]]$pngBytes)
  Write-Host "Created: $file"
}
