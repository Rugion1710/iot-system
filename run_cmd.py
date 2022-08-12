# import win32com.shell.shell as shell
# commands = 'ipconfig'
# shell.ShellExecuteEx(lpVerb='runas', lpFile='cmd.exe', lpParameters='/c '+commands)

import subprocess
subprocess.run(["pwsh", "-Command", "ls C:\RealPython"])