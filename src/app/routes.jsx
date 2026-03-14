import { lazy } from 'react';

// ─── Tool Component Map ─────────────────────────────────────────────────────
// Statically map tool slugs to their lazy-loaded components.
// Grouped by purpose directory for easy maintenance.

const toolComponentMap = {

  // ── color/ ──────────────────────────────────────────────────────────────
  "palette-lab":              lazy(() => import('../tools/color/PaletteGenerator.jsx')),
  "gradient-generator":       lazy(() => import('../tools/color/GradientGenerator.jsx')),
  "contrast-checker":         lazy(() => import('../tools/color/ContrastChecker.jsx')),
  "tint-shade-generator":     lazy(() => import('../tools/color/TintShadeGenerator.jsx')),
  "tailwind-shade-generator": lazy(() => import('../tools/color/TailwindShades.jsx')),
  "color-name-finder":        lazy(() => import('../tools/color/ColourNameFinder.jsx')),
  "accessible-color-pair-finder": lazy(() => import('../tools/color/AccessiblePairs.jsx')),
  "color-blindness-simulator": lazy(() => import('../tools/color/ColorBlindnessSimulator.jsx')),
  "screen-color-picker":      lazy(() => import('../tools/color/ScreenColorPicker.jsx')),

  // ── images/ ─────────────────────────────────────────────────────────────
  "social-cropper":           lazy(() => import('../tools/images/SocialMediaCropper.jsx')),
  "image-compressor":         lazy(() => import('../tools/images/ImageCompressor.jsx')),
  "favicon-generator":        lazy(() => import('../tools/images/FaviconGenerator.jsx')),
  "image-resizer":            lazy(() => import('../tools/images/ImageResizer.jsx')),
  "base64-image-encoder":     lazy(() => import('../tools/images/Base64Encoder.jsx')),
  "exif-metadata-viewer":     lazy(() => import('../tools/images/EXIFDataViewer.jsx')),
  "noise-texture-generator":  lazy(() => import('../tools/images/NoiseGenerator.jsx')),
  "mockup-frame-generator":   lazy(() => import('../tools/images/MockupFrameGenerator.jsx')),
  "seamless-scroll-generator": lazy(() => import('../tools/images/SeamlessScrollGenerator.jsx')),
  "watermarker":              lazy(() => import('../tools/images/Watermarker.jsx')),
  "svg-surgeon":              lazy(() => import('../tools/images/SVGOptimiser.jsx')),

  // ── dev/ ────────────────────────────────────────────────────────────────
  "qr-forge":                 lazy(() => import('../tools/dev/QRGenerator.jsx')),
  "json-formatter":           lazy(() => import('../tools/dev/JSONFormatter.jsx')),
  "slug-generator":           lazy(() => import('../tools/dev/SlugGenerator.jsx')),
  "password-generator":       lazy(() => import('../tools/dev/PasswordGenerator.jsx')),
  "diff-checker":             lazy(() => import('../tools/dev/DiffChecker.jsx')),
  "encoding-tools":           lazy(() => import('../tools/dev/EncodingTools.jsx')),
  "svg-to-jsx":               lazy(() => import('../tools/dev/SvgToJsxConverter.jsx')),
  "regex-tester":             lazy(() => import('../tools/dev/RegexTester.jsx')),
  "hash-generator":           lazy(() => import('../tools/dev/HashGenerator.jsx')),
  "fake-data-generator":      lazy(() => import('../tools/dev/FakeDataGenerator.jsx')),
  "css-clamp-generator":      lazy(() => import('../tools/dev/CssClampGenerator.jsx')),
  "css-grid-generator":       lazy(() => import('../tools/dev/CssGridGenerator.jsx')),
  "svg-path-visualizer":      lazy(() => import('../tools/dev/SvgPathVisualizer.jsx')),

  // ── text/ ───────────────────────────────────────────────────────────────
  "unit-converter":           lazy(() => import('../tools/text/UnitConverter.jsx')),
  "word-counter":             lazy(() => import('../tools/text/WordCounter.jsx')),
  "font-pairing-explorer":    lazy(() => import('../tools/text/FontPairingExplorer.jsx')),
  "markdown-previewer":       lazy(() => import('../tools/text/MarkdownPreviewer.jsx')),
  "text-case-converter":      lazy(() => import('../tools/text/TextCaseConverter.jsx')),
  "lorem-ipsum-generator":    lazy(() => import('../tools/text/LoremIpsumGenerator.jsx')),
  "readability-checker":      lazy(() => import('../tools/text/ReadabilityChecker.jsx')),
  "character-map-browser":    lazy(() => import('../tools/dev/CharacterMapBrowser.jsx')),

  // ── layout/ ─────────────────────────────────────────────────────────────
  "aspect-calculator":        lazy(() => import('../tools/layout/AspectRatioCalculator.jsx')),
  "grid-system-calculator":   lazy(() => import('../tools/layout/GridSystemCalculator.jsx')),
  "flexbox-playground":       lazy(() => import('../tools/layout/FlexboxPlayground.jsx')),
  "golden-ratio-calculator":  lazy(() => import('../tools/layout/GoldenRatioCalculator.jsx')),
  "8pt-grid-checker":         lazy(() => import('../tools/layout/EightPointGridChecker.jsx')),
  "bleed-margin-calculator":  lazy(() => import('../tools/layout/BleedMarginCalculator.jsx')),
  "export-multiplier-calculator": lazy(() => import('../tools/layout/ExportMultiplierCalculator.jsx')),

  // ── ui/ ─────────────────────────────────────────────────────────────────
  "box-shadow-generator":     lazy(() => import('../tools/ui/BoxShadowGenerator.jsx')),
  "simple-icon-set":          lazy(() => import('../tools/ui/SimpleIconSet.jsx')),
  "button-style-generator":  lazy(() => import('../tools/ui/ButtonStyleGenerator.jsx')),
  "shadow-palette-generator": lazy(() => import('../tools/ui/ShadowPaletteGenerator.jsx')),
  "border-radius-scale-generator": lazy(() => import('../tools/ui/BorderRadiusScaleGenerator.jsx')),
  "skeleton-screen-generator": lazy(() => import('../tools/ui/SkeletonScreenGenerator.jsx')),

  // ── accessibility/ ──────────────────────────────────────────────────────
  "touch-target-checker":     lazy(() => import('../tools/accessibility/TouchTargetChecker.jsx')),
  "reading-flow-simulator":   lazy(() => import('../tools/accessibility/ReadingFlowSimulator.jsx')),
  "artboard-size-reference":  lazy(() => import('../tools/accessibility/ArtboardSizeReference.jsx')),
  "aria-role-reference":      lazy(() => import('../tools/accessibility/AriaRoleReference.jsx')),
};

export default toolComponentMap;
