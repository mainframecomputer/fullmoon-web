#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print error messages
error() {
    echo -e "${RED}Error: $1${NC}" >&2
    exit 1
}

# Function to print success messages
success() {
    echo -e "${GREEN}$1${NC}"
}

# Function to print warning messages
warning() {
    echo -e "${YELLOW}Warning: $1${NC}"
}

# Check if running on supported OS
check_os() {
    case "$(uname -s)" in
        Darwin|Linux)
            success "Detected supported operating system: $(uname -s)"
            ;;
        *)
            error "This script only supports macOS and Linux"
            ;;
    esac
}

# Check if curl is installed
check_dependencies() {
    if ! command -v curl &> /dev/null; then
        error "curl is required but not installed. Please install curl first."
    fi
}

# Install uv
install_uv() {
    echo "Installing uv package manager..."
    
    # Create temporary directory for the install script
    TMP_DIR=$(mktemp -d)
    if [ $? -ne 0 ]; then
        error "Failed to create temporary directory"
    fi
    
    # Download and run the installation script
    if curl -LsSf https://astral.sh/uv/install.sh > "${TMP_DIR}/install.sh"; then
        chmod +x "${TMP_DIR}/install.sh"
        if sh "${TMP_DIR}/install.sh"; then
            success "uv has been successfully installed!"
        else
            error "Failed to run the installation script"
        fi
    else
        error "Failed to download the installation script"
    fi
    
    # Clean up
    rm -rf "${TMP_DIR}"
}

# Check if uv is already installed
check_existing_installation() {
    if command -v uv &> /dev/null; then
        warning "uv is already installed. Current version: $(uv --version)"
        read -p "Do you want to reinstall? [y/N] " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 0
        fi
    fi
}

# Add uv to PATH if necessary
setup_path() {
    if ! grep -q "export PATH=\"\$HOME/.cargo/bin:\$PATH\"" ~/.bashrc; then
        echo 'export PATH="$HOME/.cargo/bin:$PATH"' >> ~/.bashrc
        warning "Added uv to PATH. Please restart your shell or run: source ~/.bashrc"
    fi
}

# Install mlx-omni-server using uv
install_mlx_omni_server() {
    echo "Installing mlx-omni-server..."
    if command -v uv &> /dev/null; then
        if uv pip install mlx-omni-server; then
            success "mlx-omni-server has been successfully installed!"
        else
            error "Failed to install mlx-omni-server"
        fi
    else
        error "uv is not available in PATH. Please restart your shell or run: source ~/.bashrc"
    fi
}

# Main installation process
main() {
    echo "UV Package Manager Installation"
    echo "------------------------------"
    
    check_os
    check_dependencies
    check_existing_installation
    install_uv
    setup_path
    
    # Source the updated PATH to make uv available in the current session
    source ~/.bashrc
    
    # Install mlx-omni-server
    install_mlx_omni_server
    
    success "Installation complete! UV and mlx-omni-server have been installed successfully."
    echo "Try running: uv --help"
}

# Run the main function
main