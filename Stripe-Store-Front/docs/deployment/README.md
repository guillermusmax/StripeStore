# Guía de Despliegue - Stripe Store

## Requisitos Previos
- Docker y Docker Compose
- Kubernetes (minikube o cluster)
- kubectl
- Helm
- Git

## Entornos

### Desarrollo
1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/stripe-store.git
cd stripe-store
```

2. Configurar variables de entorno:
```bash
cp .env.example .env.local
```

3. Iniciar con Docker Compose:
```bash
docker-compose up -d
```

### Staging
1. Configurar acceso al cluster:
```bash
kubectl config use-context staging
```

2. Desplegar con Helm:
```bash
helm install stripe-store ./helm/stripe-store \
  --namespace staging \
  --set environment=staging
```

### Producción
1. Configurar acceso al cluster:
```bash
kubectl config use-context production
```

2. Desplegar con Helm:
```bash
helm install stripe-store ./helm/stripe-store \
  --namespace production \
  --set environment=production
```

## Configuración de Kubernetes

### Namespaces
```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: stripe-store
```

### Deployments
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
      - name: frontend
        image: stripe-store-frontend:latest
        ports:
        - containerPort: 3000
```

### Services
```yaml
apiVersion: v1
kind: Service
metadata:
  name: frontend
spec:
  selector:
    app: frontend
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer
```

## Monitoreo y Logging

### Prometheus
```yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: stripe-store
spec:
  selector:
    matchLabels:
      app: frontend
  endpoints:
  - port: metrics
```

### Grafana
- Dashboard: `stripe-store`
- Métricas principales:
  - Tasa de solicitudes
  - Tiempo de respuesta
  - Uso de recursos
  - Errores

## Backups

### Base de Datos
```bash
# Backup diario
kubectl exec -n stripe-store deploy/mongodb -- mongodump --out /backup/$(date +%Y%m%d)

# Restaurar
kubectl exec -n stripe-store deploy/mongodb -- mongorestore /backup/20240101
```

## Escalado

### Horizontal Pod Autoscaling
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: frontend
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: frontend
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

## Troubleshooting

### Logs
```bash
# Ver logs del frontend
kubectl logs -n stripe-store deploy/frontend

# Ver logs de todos los pods
kubectl logs -n stripe-store -l app=frontend
```

### Diagnóstico
```bash
# Ver estado de los pods
kubectl get pods -n stripe-store

# Describir pod
kubectl describe pod -n stripe-store <pod-name>

# Ver eventos
kubectl get events -n stripe-store
```

## Rollback
```bash
# Rollback a versión anterior
kubectl rollout undo deployment/frontend -n stripe-store

# Rollback a versión específica
kubectl rollout undo deployment/frontend -n stripe-store --to-revision=2
``` 