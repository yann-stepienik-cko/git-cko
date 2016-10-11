# git-cko

Checkout.com's git superset to manage repo's.

Features list :

 * Link two repo's together to mirror branches name
 * Automate your Zenhub flow
 * Automate your branches
 * Auto attach issue numbers to commit messages

# Documentation

## Getting started

First, you need to install git-cko using NPM.

    npm install git-cko -g

Now, you can clone a repo to get started.

    git-cko clone <repository URL>

You can also init it in an existing repository on your local machine.

    git-cko init

Git-cko is going to ask you for a GitHub token. You can later change it by editing ~/.git-cko/config.json on Linux or C:/Users/<name>/git-cko/config.json on Windows.

## Start git-cko

Git-cko can function in two modes.


### interactive mode

This is the default mode, an interactive command line starting in background.
By default, any git-cko will spawn the background task. You can manage the service with the commands :

     git-cko <start|stop|restart>

### Classic mode

This is the classic git mode. All you have to do is use git-cko like you're using git. For example :

    git-cko commit -m "<message>"

In order for those commands to not spawn any background task, please set "background" to false in your config.json file.

## Branching strategy

### Hotfixes

Create an Hotfix branch and create the associated issue

    git-flow hotfix

Create an Hotfix branch and link an existing issue

    git-flow hotfix #123

Options :

 * --name="<name>" change the name of the created issue
 * --description="<description>" change the description of the created issue
 * --no-issue don't link an issue

Hotfix will get merged inside the *current* Release branch and develop.

### Features

Create an Feature branch and create the associated issue

    git-flow feature

Create an Feature branch and link an existing issue

    git-flow feature #123

Options :

 * --name="<name>" change the name of the created issue
 * --description="<description>" change the description of the created issue
 * --no-issue don't link an issue

Features will get merged inside develop, and *incoming* Releases

### Releases

Create a release branch and auto bump the version

    git-flow release

Create a release branch and bump the version accordingly

    git-flow release <major|minor|path>

Create a release branch with specific version

    git-flow release 1.2.3

## Control branches

When using git-cko you don't need to manually control your branch merging strategy, you control it with commit messages (Issue number will be preprended to it). First init your branch :

    git-flow commit init "this is my explicit commit message"

Next, progressively update it (you can add an optional message, default is "WIP" ) :

    git-flow commit wip

Finally mark it has "done". This will create a Pull Request, that can be merged using squash (you can add an optional message, default is "done" ) :

    git-flow commit done

## Repository links

git-cko allow you to link two repositories together so that when you create a branch on one of them, it get created on the other one in order to keep naming consistent. You need to have access to both repositories.

    git-cko link <linked_repository>

Everytime you're going to create a branch, it will be mirrored.

    git-cko release minor
    Creating new minor 2.3.4 in branch release/2.3.4
    Branch doesn't exist in me/other, mirroring branch

Additional control are available

no mirroring :

    git-cko hotfix #1 --no-mirror

mirror only specific (repo can be unlinked) :

git-cko hotfix #1 --mirror=<repo_name> --mirror=<repo_name2>


## Zenhub

git-cko will manage your Zenhub flow automatically.

    git-cko hotifx #234
    Creating branch hotfix/menu-not-displayed
    Moving issue #234 to planned

    git-cko commit init "fix menu not displaying"
    Moving issue #234 to in progress

    git-cko commit done
    Moving issue #234 to done

You can configure pipelines by editing <repo>/.git-cko/zenhub.json


## Changelog and Releases notes

When using git-cko Changelog and Releases notes are also generated using Conventional-Changelog.
You can customize it by editing <repo>/.git-cko/changelog.json

blablabla...
