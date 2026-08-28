param(
    [string]$RepositoryRoot = (Split-Path -Parent $PSScriptRoot)
)

$statePath = Join-Path $RepositoryRoot 'DSA-Mastery\20-Revision\revision-state.json'
$state = Get-Content -Raw $statePath | ConvertFrom-Json
$today = [TimeZoneInfo]::ConvertTimeBySystemTimeZoneId([DateTime]::UtcNow, 'India Standard Time').ToString('yyyy-MM-dd')
$due = @($state.reviews | Where-Object { $_.status -eq 'due' -and $_.dueDate -le $today } | Sort-Object dueDate | Select-Object -First $state.settings.dailyLimit)

if ($due.Count -eq 0) {
    Write-Output 'No revision reviews are due.'
    exit 0
}

if (-not (Get-Module -ListAvailable -Name BurntToast)) {
    Write-Error 'BurntToast is required for Windows notifications. Install once with: Install-Module BurntToast -Scope CurrentUser'
    exit 1
}

Import-Module BurntToast
$body = ($due | ForEach-Object { "$($_.title) - $($_.stage -replace '-', ' ')" }) -join "`n"
New-BurntToastNotification -Text "DSA revision: $($due.Count) due", $body