{ pkgs ? import <nixpkgs> {} }:

let
  # Gunakan Node.js 16 LTS
  nodejs = pkgs.nodejs-16_x;
  
  # Pakai nodePackages dari versi Node.js 16
  nodePackages = pkgs.nodePackages.override { nodejs = nodejs; };
in
pkgs.mkShell {
  buildInputs = [
    nodejs
    nodePackages.babel-loader
    nodePackages.webpack
    nodePackages.webpack-cli
    nodePackages."@babel/core"
    nodePackages."@babel/preset-env"
    
    # Tools tambahan
    pkgs.yarn
    pkgs.nodePackages.npm
  ];

  shellHook = ''
    # Fix OpenSSL error
    export NODE_OPTIONS="--openssl-legacy-provider"
    
    # Set PATH untuk node_modules lokal
    export PATH="$PWD/node_modules/.bin:$PATH"
    
    echo "Node.js $(node --version) siap digunakan!"
    echo "Babel-loader versi $(babel-loader --version)"
  '';
}
