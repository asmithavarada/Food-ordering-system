@echo off
set MAVEN_HOME=C:\Program Files\Apache Software Foundation\apache-maven-3.9.6
set PATH=%MAVEN_HOME%\bin;%PATH%
mvn %*
