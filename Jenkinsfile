pipeline {
    agent any  // El agente debe tener Docker y docker compose instalados

    options {
        timestamps()
    }

    environment {
        // Solo para que veas en consola qué rama se está usando en el multibranch
        CURRENT_BRANCH = "${env.BRANCH_NAME}"
    }

    stages {

        stage('Info') {
            steps {
                echo "Ejecutando pipeline para la rama: ${env.BRANCH_NAME}"
            }
        }

        stage('Checkout') {
            steps {
                // Descarga el código de la rama que disparó el build
                checkout scm
            }
        }

        stage('Levantar con docker compose') {
            steps {
                sh '''
                    set -e

                    echo "Buscando archivo docker compose en el repo..."

                    COMPOSE_FILE="aplicacion web- inventario/docker-compose.yml"

                    echo "Usando archivo: $COMPOSE_FILE"

                    echo "Bajando stack anterior (si existe)..."
                    docker compose -f "$COMPOSE_FILE" down || true

                    echo "Haciendo pull de las últimas imágenes..."
                    docker compose -f "$COMPOSE_FILE" pull

                    echo "Levantando servicios..."
                    docker compose -f "$COMPOSE_FILE" up -d --build

                    echo "Servicios levantados correctamente con docker compose."
                '''
            }
        }
    }

    post {
        success {
            echo "Ejecucion exitosa del pipeline!! ${env.BRANCH_NAME}"
        }
        failure {
            echo "Error de ejecucion del pipeline :( ${env.BRANCH_NAME}"
        }
    }
}