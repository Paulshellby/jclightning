# Regenerates sitemap.xml from the current site files, so it never goes stale.
# No hardcoded paths/Chinese literals: base is derived from this script's own folder
# (.../网站/tools -> parent = .../网站). Safe under Windows PowerShell 5.1.
$ErrorActionPreference = 'Stop'
$base   = (Get-Item $PSScriptRoot).Parent.FullName
$origin = 'https://jclightning.com'
$catSlugs = @('solar-security-street-lights','solar-garden-landscape-lights','solar-decorative-wall-lights','off-grid-portable-solar-lights')

function Get-Url([string]$rel){
  $u = $rel -replace '\\','/'
  if ($u -eq 'index.html') { return "$origin/" }
  $segs = $u.Split('/') | ForEach-Object { [uri]::EscapeDataString($_) }
  return "$origin/" + ($segs -join '/')
}
function Get-Priority([string]$rel){
  $u = $rel -replace '\\','/'
  if ($u -eq 'index.html') { return '1.0' }
  if ($u -match '^products/(es|pt|fr)/') { return '0.7' }
  if ($u -match '^products/[^/]+\.html$') {
    $slug = ($u -replace '^products/','') -replace '\.html$',''
    if ($catSlugs -contains $slug) { return '0.8' } else { return '0.7' }
  }
  if ($u -match '^insights/(es|pt|fr)/') { return '0.6' }
  if ($u -match '^insights/[^/]+\.html$') { return '0.7' }
  return '0.6'
}

# Collect pages: home + everything under insights/ and products/.
# (index源文件.html, the GSC verification file, 404.html etc. at root are excluded by design.)
$files = @()
$idx = Join-Path $base 'index.html'
if (Test-Path -LiteralPath $idx) { $files += Get-Item -LiteralPath $idx }
foreach ($dir in @('insights','products')) {
  $d = Join-Path $base $dir
  if (Test-Path -LiteralPath $d) { $files += Get-ChildItem -LiteralPath $d -Recurse -Filter *.html }
}

$sb = New-Object System.Text.StringBuilder
[void]$sb.AppendLine('<?xml version="1.0" encoding="UTF-8"?>')
[void]$sb.AppendLine('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
foreach ($f in $files) {
  $rel = $f.FullName.Substring($base.Length + 1)
  $url = Get-Url $rel
  $pri = Get-Priority $rel
  $cf  = if (($rel -replace '\\','/') -eq 'index.html') { 'weekly' } else { 'monthly' }
  $lm  = $f.LastWriteTime.ToString('yyyy-MM-dd')
  [void]$sb.AppendLine('  <url>')
  [void]$sb.AppendLine("    <loc>$url</loc>")
  [void]$sb.AppendLine("    <changefreq>$cf</changefreq>")
  [void]$sb.AppendLine("    <priority>$pri</priority>")
  [void]$sb.AppendLine("    <lastmod>$lm</lastmod>")
  [void]$sb.AppendLine('  </url>')
}
[void]$sb.AppendLine('</urlset>')

$enc = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText((Join-Path $base 'sitemap.xml'), $sb.ToString(), $enc)
Write-Host ("sitemap.xml regenerated: {0} URLs" -f $files.Count)
