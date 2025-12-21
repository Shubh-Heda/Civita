# Fix all versioned imports
$files = Get-ChildItem -Path "src" -Recurse -Include *.ts,*.tsx

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $original = $content
    
    # Fix all package@version imports
    $content = $content -replace '"sonner@2\.0\.3"', '"sonner"'
    $content = $content -replace "'sonner@2\.0\.3'", "'sonner'"
    $content = $content -replace '"lucide-react@0\.487\.0"', '"lucide-react"'
    $content = $content -replace "'lucide-react@0\.487\.0'", "'lucide-react'"
    $content = $content -replace '"class-variance-authority@0\.7\.1"', '"class-variance-authority"'
    $content = $content -replace "'class-variance-authority@0\.7\.1'", "'class-variance-authority'"
    $content = $content -replace '"react-hook-form@7\.55\.0"', '"react-hook-form"'
    $content = $content -replace "'react-hook-form@7\.55\.0'", "'react-hook-form'"
    $content = $content -replace '"recharts@2\.15\.2"', '"recharts"'
    $content = $content -replace "'recharts@2\.15\.2'", "'recharts'"
    $content = $content -replace '"embla-carousel-react@8\.6\.0"', '"embla-carousel-react"'
    $content = $content -replace "'embla-carousel-react@8\.6\.0'", "'embla-carousel-react'"
    $content = $content -replace '"react-day-picker@8\.10\.1"', '"react-day-picker"'
    $content = $content -replace "'react-day-picker@8\.10\.1'", "'react-day-picker'"
    $content = $content -replace '"next-themes@0\.4\.6"', '"next-themes"'
    $content = $content -replace "'next-themes@0\.4\.6'", "'next-themes'"
    $content = $content -replace '"input-otp@1\.4\.2"', '"input-otp"'
    $content = $content -replace "'input-otp@1\.4\.2'", "'input-otp'"
    $content = $content -replace '"vaul@1\.1\.2"', '"vaul"'
    $content = $content -replace "'vaul@1\.1\.2'", "'vaul'"
    $content = $content -replace '"cmdk@1\.1\.1"', '"cmdk"'
    $content = $content -replace "'cmdk@1\.1\.1'", "'cmdk'"
    $content = $content -replace '"react-resizable-panels@2\.1\.7"', '"react-resizable-panels"'
    $content = $content -replace "'react-resizable-panels@2\.1\.7'", "'react-resizable-panels'"
    
    # Fix Radix UI packages
    $content = $content -replace '"@radix-ui/react-accordion@[\d\.]+"', '"@radix-ui/react-accordion"'
    $content = $content -replace "'@radix-ui/react-accordion@[\d\.]+'", "'@radix-ui/react-accordion'"
    $content = $content -replace '"@radix-ui/react-alert-dialog@[\d\.]+"', '"@radix-ui/react-alert-dialog"'
    $content = $content -replace "'@radix-ui/react-alert-dialog@[\d\.]+'", "'@radix-ui/react-alert-dialog'"
    $content = $content -replace '"@radix-ui/react-aspect-ratio@[\d\.]+"', '"@radix-ui/react-aspect-ratio"'
    $content = $content -replace "'@radix-ui/react-aspect-ratio@[\d\.]+'", "'@radix-ui/react-aspect-ratio'"
    $content = $content -replace '"@radix-ui/react-avatar@[\d\.]+"', '"@radix-ui/react-avatar"'
    $content = $content -replace "'@radix-ui/react-avatar@[\d\.]+'", "'@radix-ui/react-avatar'"
    $content = $content -replace '"@radix-ui/react-checkbox@[\d\.]+"', '"@radix-ui/react-checkbox"'
    $content = $content -replace "'@radix-ui/react-checkbox@[\d\.]+'", "'@radix-ui/react-checkbox'"
    $content = $content -replace '"@radix-ui/react-collapsible@[\d\.]+"', '"@radix-ui/react-collapsible"'
    $content = $content -replace "'@radix-ui/react-collapsible@[\d\.]+'", "'@radix-ui/react-collapsible'"
    $content = $content -replace '"@radix-ui/react-context-menu@[\d\.]+"', '"@radix-ui/react-context-menu"'
    $content = $content -replace "'@radix-ui/react-context-menu@[\d\.]+'", "'@radix-ui/react-context-menu'"
    $content = $content -replace '"@radix-ui/react-dialog@[\d\.]+"', '"@radix-ui/react-dialog"'
    $content = $content -replace "'@radix-ui/react-dialog@[\d\.]+'", "'@radix-ui/react-dialog'"
    $content = $content -replace '"@radix-ui/react-dropdown-menu@[\d\.]+"', '"@radix-ui/react-dropdown-menu"'
    $content = $content -replace "'@radix-ui/react-dropdown-menu@[\d\.]+'", "'@radix-ui/react-dropdown-menu'"
    $content = $content -replace '"@radix-ui/react-hover-card@[\d\.]+"', '"@radix-ui/react-hover-card"'
    $content = $content -replace "'@radix-ui/react-hover-card@[\d\.]+'", "'@radix-ui/react-hover-card'"
    $content = $content -replace '"@radix-ui/react-label@[\d\.]+"', '"@radix-ui/react-label"'
    $content = $content -replace "'@radix-ui/react-label@[\d\.]+'", "'@radix-ui/react-label'"
    $content = $content -replace '"@radix-ui/react-menubar@[\d\.]+"', '"@radix-ui/react-menubar"'
    $content = $content -replace "'@radix-ui/react-menubar@[\d\.]+'", "'@radix-ui/react-menubar'"
    $content = $content -replace '"@radix-ui/react-navigation-menu@[\d\.]+"', '"@radix-ui/react-navigation-menu"'
    $content = $content -replace "'@radix-ui/react-navigation-menu@[\d\.]+'", "'@radix-ui/react-navigation-menu'"
    $content = $content -replace '"@radix-ui/react-popover@[\d\.]+"', '"@radix-ui/react-popover"'
    $content = $content -replace "'@radix-ui/react-popover@[\d\.]+'", "'@radix-ui/react-popover'"
    $content = $content -replace '"@radix-ui/react-progress@[\d\.]+"', '"@radix-ui/react-progress"'
    $content = $content -replace "'@radix-ui/react-progress@[\d\.]+'", "'@radix-ui/react-progress'"
    $content = $content -replace '"@radix-ui/react-radio-group@[\d\.]+"', '"@radix-ui/react-radio-group"'
    $content = $content -replace "'@radix-ui/react-radio-group@[\d\.]+'", "'@radix-ui/react-radio-group'"
    $content = $content -replace '"@radix-ui/react-scroll-area@[\d\.]+"', '"@radix-ui/react-scroll-area"'
    $content = $content -replace "'@radix-ui/react-scroll-area@[\d\.]+'", "'@radix-ui/react-scroll-area'"
    $content = $content -replace '"@radix-ui/react-select@[\d\.]+"', '"@radix-ui/react-select"'
    $content = $content -replace "'@radix-ui/react-select@[\d\.]+'", "'@radix-ui/react-select'"
    $content = $content -replace '"@radix-ui/react-separator@[\d\.]+"', '"@radix-ui/react-separator"'
    $content = $content -replace "'@radix-ui/react-separator@[\d\.]+'", "'@radix-ui/react-separator'"
    $content = $content -replace '"@radix-ui/react-slider@[\d\.]+"', '"@radix-ui/react-slider"'
    $content = $content -replace "'@radix-ui/react-slider@[\d\.]+'", "'@radix-ui/react-slider'"
    $content = $content -replace '"@radix-ui/react-slot@[\d\.]+"', '"@radix-ui/react-slot"'
    $content = $content -replace "'@radix-ui/react-slot@[\d\.]+'", "'@radix-ui/react-slot'"
    $content = $content -replace '"@radix-ui/react-switch@[\d\.]+"', '"@radix-ui/react-switch"'
    $content = $content -replace "'@radix-ui/react-switch@[\d\.]+'", "'@radix-ui/react-switch'"
    $content = $content -replace '"@radix-ui/react-tabs@[\d\.]+"', '"@radix-ui/react-tabs"'
    $content = $content -replace "'@radix-ui/react-tabs@[\d\.]+'", "'@radix-ui/react-tabs'"
    $content = $content -replace '"@radix-ui/react-toggle@[\d\.]+"', '"@radix-ui/react-toggle"'
    $content = $content -replace "'@radix-ui/react-toggle@[\d\.]+'", "'@radix-ui/react-toggle'"
    $content = $content -replace '"@radix-ui/react-toggle-group@[\d\.]+"', '"@radix-ui/react-toggle-group"'
    $content = $content -replace "'@radix-ui/react-toggle-group@[\d\.]+'", "'@radix-ui/react-toggle-group'"
    $content = $content -replace '"@radix-ui/react-tooltip@[\d\.]+"', '"@radix-ui/react-tooltip"'
    $content = $content -replace "'@radix-ui/react-tooltip@[\d\.]+'", "'@radix-ui/react-tooltip'"
    
    if ($content -ne $original) {
        Set-Content $file.FullName -Value $content -NoNewline
        Write-Host "Fixed: $($file.Name)"
    }
}

Write-Host "`n✅ All versioned imports fixed!"
