# rebrand-clarityforus.ps1
$projectName = "ClarityForUS"
$tagline = "Civic tech apps that turn complexity into clarity."

# 1. Update index.html
$indexPath = ".\public\index.html"

if (Test-Path $indexPath) {
    Write-Host "🔤 Updating title and meta tags in index.html..."

    # Read contents
    $html = Get-Content $indexPath

    # Replace <title>
    $html = $html -replace '<title>.*?</title>', "<title>$projectName — civic tech apps that turn complexity into clarity</title>"

    # Remove existing meta tags
    $html = $html -replace '<meta name="description".*?>', ''
    $html = $html -replace '<meta property="og:title".*?>', ''
    $html = $html -replace '<meta property="og:description".*?>', ''
    $html = $html -replace '<meta property="og:image".*?>', ''
    $html = $html -replace '<meta name="twitter:card".*?>', ''

    # Insert new meta tags after <title>
    $titleIndex = ($html | Select-String -Pattern "<title>").LineNumber - 1
    $newMeta = @(
        '<meta name="description" content="' + $tagline + '">',
        '<meta property="og:title" content="' + $projectName + '">',
        '<meta property="og:description" content="' + $tagline + '">',
        '<meta property="og:image" content="/og-image.png">',
        '<meta name="twitter:card" content="summary_large_image">'
    )
    $html = $html[0..$titleIndex] + $newMeta + $html[($titleIndex + 1)..($html.Length - 1)]

    # Save updated file
    Set-Content $indexPath $html
}
else {
    Write-Host "⚠️ index.html not found at $indexPath"
}

# 2. Replace ClarityForUs → ClarityForUS in ./src/
Write-
