import 'package:flutter/material.dart';

class AppStyles {
  static double _getResponsiveSize(BuildContext context, double percentage) {
    return MediaQuery.of(context).size.width * percentage;
  }

  // Responsive Text Styles
  static TextStyle heading1(BuildContext context) {
    return TextStyle(
      fontSize: _getResponsiveSize(context, 0.06),
      fontWeight: FontWeight.bold,
      color: Colors.red,
    );
  }

  static TextStyle heading2(BuildContext context) {
    return TextStyle(
      fontSize: _getResponsiveSize(context, 0.05),
      fontWeight: FontWeight.w600,
      color: Colors.black,
    );
  }

  static TextStyle bodyText(BuildContext context) {
    return TextStyle(
      fontSize: _getResponsiveSize(context, 0.04),
      color: Colors.black87,
    );
  }

  static TextStyle captionText(BuildContext context) {
    return TextStyle(
      fontSize: _getResponsiveSize(context, 0.035),
      color: Colors.grey[600],
    );
  }

  // Responsive Spacing
  static double horizontalSpacing(BuildContext context) {
    return _getResponsiveSize(context, 0.04);
  }

  static verticalSpacing(BuildContext context) {
    return SizedBox(height: _getResponsiveSize(context, 0.02));
  }

  static EdgeInsets padding(BuildContext context) {
    return EdgeInsets.symmetric(
      horizontal: horizontalSpacing(context),
      vertical: verticalSpacing(context),
    );
  }

  static EdgeInsets responsivePadding(
    BuildContext context, {
    double horizontal = 0.04,
    double vertical = 0.02,
  }) {
    return EdgeInsets.symmetric(
      horizontal: _getResponsiveSize(context, horizontal),
      vertical: _getResponsiveSize(context, vertical),
    );
  }

  // Screen Size Breakpoints
  static bool isSmallScreen(BuildContext context) {
    return MediaQuery.of(context).size.width < 600;
  }

  static bool isMediumScreen(BuildContext context) {
    return MediaQuery.of(context).size.width >= 600 &&
        MediaQuery.of(context).size.width < 1200;
  }

  static bool isLargeScreen(BuildContext context) {
    return MediaQuery.of(context).size.width >= 1200;
  }
}
