# Todos with kubernetes

Simple todos, app created for learning basics of kubernetes, nodejs and martial UI.

### Most important technologies

- React
- MaterialUI
- Node.js
- Express
- Kubernetes
- Docker
- Github actions

### How to run dev

You need to have installed docker and kubernetes on your device.

Install ingress-nginx:

```sh
# macOS and windows
$ kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.43.0/deploy/static/provider/cloud/deploy.yaml
```

More information about instalation (also linux) ingres-nginx you can find:
https://kubernetes.github.io/ingress-nginx/deploy/#provider-specific-steps

Create secret key:

```sh
$ kubectl create secret generic jwt-secret --from-literal=JWT_KEY=123qweasd

# If you want to check, that your secret key was created, run:
$ kubectl get secrets
```

Create link for developer mode:

```sh
# Open file from your console:
#mack and linux
$ vim etc/hosts

#windows
$ vim C:\Windows\System32\Drivers\etc\hosts

# Paste on the bottom of the file:
$ 127.0.0.1 todos.pl
# And save (if you want to modify this file you must open it with sudo permissions)
```

Run (in the root project directory):

```sh
$ skaffold dev
```

Now, the project should be working on port https://todos.pl
