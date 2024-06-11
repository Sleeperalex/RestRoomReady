# Chemin vers le fichier JSON
$jsonPath = ".\config.json"

# Lire le fichier JSON et convertir en objet
$config = Get-Content $jsonPath | ConvertFrom-Json

# Vérifier si la clé 'api_places' est à true et exécuter fetch.py si c'est le cas
if ($config.api_places -eq $true) {
    $pythonScriptPath = ".\fetch.py"
    python $pythonScriptPath
    Write-Host "fetch.py has been executed."
} else {
    Write-Host "API configured as false, fetch.py has not been executed."
}

# Démarrer le serveur HTTP local en utilisant Python 3
$serverJob = Start-Job -ScriptBlock {
    python -m http.server 8000
}

# Attendre un peu pour que le serveur démarre
Start-Sleep -Seconds 2

# Ouvrir le navigateur web à localhost:8000
Start-Process "http://localhost:8000"

# Attendre que l'utilisateur appuie sur 'Enter' pour arrêter le serveur
Read-Host "press Enter to stop the server"
Stop-Job -Job $serverJob
Remove-Job -Job $serverJob
Write-Host "Server stopped."
