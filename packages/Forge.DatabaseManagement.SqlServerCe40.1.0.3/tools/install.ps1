param($installPath, $toolsPath, $package, $project)
 
if ($host.Version.Major -eq 1 -and $host.Version.Minor -lt 1) 
{ 
    "NOTICE: This package only works with NuGet 1.1 or above. Please update your NuGet install at http://nuget.org"
}
else
{
	$project.ProjectItems.Item("Forge.Base.dll")
	$project.Object.References.Add("Forge.Base.dll"); 
}
