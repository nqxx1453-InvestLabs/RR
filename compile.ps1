$jsPath = "C:\Users\feyzu\.gemini\antigravity-ide\scratch\crypto-collapse-dashboard\generate_dashboard.js"
$htmlPath = "C:\Users\feyzu\.gemini\antigravity-ide\scratch\crypto-collapse-dashboard\dashboard.html"

# Read using UTF-8 to preserve all Turkish characters and emojis
$jsContent = [System.IO.File]::ReadAllText($jsPath, [System.Text.Encoding]::UTF8)

# Helper to extract array content between "const name = [" and "];"
function Extract-Array($name) {
    $pattern = "(?s)const\s+$name\s*=\s*\[(.*?)\]\s*;"
    if ($jsContent -match $pattern) {
        return "[" + $Matches[1] + "]"
    }
    return $null
}

$catA_json = Extract-Array "cat_a"
$catB_json = Extract-Array "cat_b"
$catC_json = Extract-Array "cat_c"
$remainingA_json = Extract-Array "remaining_a"
$remainingB_json = Extract-Array "remaining_b"
$remainingC_json = Extract-Array "remaining_c"

# Parse JSON
# Clean trailing commas and comments
function Clean-Json($json) {
    if ($json -eq $null) { return $null }
    # Remove trailing commas before closing brackets/braces
    $json = $json -replace ',\s*(\]|\})', '$1'
    # Remove single line comments
    $json = $json -replace '//.*', ''
    return $json
}

$cleanedA = Clean-Json $catA_json
[System.IO.File]::WriteAllText("C:\Users\feyzu\.gemini\antigravity-ide\scratch\crypto-collapse-dashboard\debug_catA.json", $cleanedA, [System.Text.Encoding]::UTF8)

$catA = ConvertFrom-Json $cleanedA
$catB = ConvertFrom-Json (Clean-Json $catB_json)
$catC = ConvertFrom-Json (Clean-Json $catC_json)
$remA = ConvertFrom-Json (Clean-Json $remainingA_json)
$remB = ConvertFrom-Json (Clean-Json $remainingB_json)
$remC = ConvertFrom-Json (Clean-Json $remainingC_json)

$allCases = [System.Collections.Generic.List[PSCustomObject]]::new()

# Add catA directly and set category to A
foreach ($item in $catA) {
    if ($item -ne $null) {
        $item | Add-Member -MemberType NoteProperty -Name "category" -Value "A" -Force
        $allCases.Add($item)
    }
}

# Add catB directly and set category to B
foreach ($item in $catB) {
    if ($item -ne $null) {
        $item | Add-Member -MemberType NoteProperty -Name "category" -Value "B" -Force
        $allCases.Add($item)
    }
}

# Add catC directly and set category to C
foreach ($item in $catC) {
    if ($item -ne $null) {
        $item | Add-Member -MemberType NoteProperty -Name "category" -Value "C" -Force
        $allCases.Add($item)
    }
}

# Helper to convert array items
function Add-Remaining($items, $category) {
    if ($items -ne $null) {
        foreach ($item in $items) {
            if ($item -ne $null -and $item.Count -ge 9) {
                $obj = [PSCustomObject]@{
                    name = $item[0]
                    logo = $item[1]
                    type = $item[2]
                    metric = $item[3]
                    speed = $item[4]
                    business = $item[5]
                    s = $item[6]
                    w = $item[7]
                    lesson = $item[8]
                    category = $category
                }
                $allCases.Add($obj)
            }
        }
    }
}

Add-Remaining $remA "A"
Add-Remaining $remB "B"
Add-Remaining $remC "C"

# Convert all cases to JSON
$casesJson = ConvertTo-Json $allCases -Depth 10 -Compress

# Read the HTML template from generate_dashboard.js
$htmlPattern = '(?s)`(<!DOCTYPE html>.*?<\/html>)'
if ($jsContent -match $htmlPattern) {
    $htmlTemplate = $Matches[1]
    
    # We need to escape any literal $ signs in the JSON so PowerShell's -replace doesn't treat them as regex group references.
    # Actually, the replacement string in -replace can contain $ signs, which must be escaped as $$
    $escapedCasesJson = $casesJson -replace '\$', '$$$$'
    
    # Replace ${casesJson} with the actual JSON
    $compiledHtml = $htmlTemplate -replace '\$\{casesJson\}', $escapedCasesJson
    
    # Clean up escaped backticks and dollar signs from the JS template
    $compiledHtml = $compiledHtml -replace '\\`', '`'
    $compiledHtml = $compiledHtml -replace '\\\$', '$'
    
    # Write the compiled HTML using UTF-8 to preserve all Turkish characters and emojis
    [System.IO.File]::WriteAllText($htmlPath, $compiledHtml, [System.Text.Encoding]::UTF8)
    Write-Output "Successfully compiled dashboard.html with $($allCases.Count) projects!"
} else {
    Write-Error "Could not find htmlContent template in generate_dashboard.js"
}
