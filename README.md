# Zora Store

![Build Status](https://img.shields.io/badge/build-passing-brightgreen) ![Version](https://img.shields.io/badge/version-1.0.0-blue)

## Description

Zora Store is a high-performance, responsive e-commerce platform designed for Zora, an Indonesian fashion brand. The platform showcases elegant fashion products with a modern design, optimized for conversion and user experience.

## Key Features

- **Homepage**: Hero section, featured collections, new arrivals, and newsletter signup.
- **Product Catalog**: Advanced filtering, search with auto-suggestions, and lazy loading.
- **Product Details**: Zoomable images, size guide, and related products.
- **Shopping Experience**: Persistent mini-cart, wishlist, and animated interactions.
- **Mobile Optimization**: Touch-friendly interface and responsive design.
- **Performance & SEO**: Optimized asset loading, semantic HTML, and structured data.

## Prerequisites

- **Node.js**: Ensure you have Node.js (v16 or later) installed. [Download Node.js](https://nodejs.org/)
- **npm**: Comes with Node.js. Verify with `npm -v`.
- **Git**: Required for cloning the repository. [Download Git](https://git-scm.com/)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/zora-store.git
   cd zora-store
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the app in your browser at `http://localhost:5173`.

## Usage

### Running the Development Server

```bash
npm run dev
```

This starts the Vite development server with hot module replacement.

### Building for Production

```bash
npm run build
```

This generates optimized static files in the `dist` directory.

### Previewing the Build

```bash
npm run preview
```

Serves the production build locally for testing.

## Configuration

- **TailwindCSS**: Modify `tailwind.config.js` to customize the theme.
- **SEO**: Update default metadata in `src/components/common/SEO.jsx`.

## Project Structure

```
zora_store/
├── public/          # Static assets
├── src/             # Source code
│   ├── components/  # Reusable components
│   ├── pages/       # Page components
│   ├── hooks/       # Custom hooks
│   ├── context/     # Context providers
│   ├── data/        # Static data
│   └── index.css    # Global styles
├── package.json     # Project metadata
├── vite.config.js   # Vite configuration
└── README.md        # Project documentation
```

## Testing

- **Linting**: Run ESLint to check for code quality issues:
  ```bash
  npm run lint
  ```
- **Unit Tests**: Add tests using your preferred testing library (e.g., Jest).

## Deployment

1. Build the project:
   ```bash
   npm run build
   ```
2. Deploy the `dist` folder to your hosting provider (e.g., Vercel, Netlify).

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgments

- **React**: For the robust UI framework.
- **TailwindCSS**: For the utility-first CSS framework.
- **Framer Motion**: For smooth animations.

## Contact

Contact me to talk about future opportunities.

- **Email**: rnaldi1812@gmail.com

## Support

Support me more:

- **EVM**: 0x589f0338F07f09E66FD1678A90353ab21c33833D

---
