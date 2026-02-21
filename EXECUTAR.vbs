Set oShell = CreateObject("WScript.Shell")
Set oFSO = CreateObject("Scripting.FileSystemObject")

' Obter o diretório do script
strPath = oShell.CurrentDirectory

' Executar EXECUTAR.bat no diretório correto
oShell.Run "cmd.exe /K cd /d """ & strPath & """ && EXECUTAR.bat", 1, False
