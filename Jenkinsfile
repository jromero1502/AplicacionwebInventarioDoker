pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
    }

    post {
        success {
            echo "Repositorio descargado correctamente."
        }
    }
}