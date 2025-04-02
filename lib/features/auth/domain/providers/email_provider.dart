import 'package:flutter_riverpod/flutter_riverpod.dart';

class EmailValidationState {
  final String email;
  final String password;
  final bool isEmailValid;
  final bool isPasswordValid;
  final String? emailError;
  final String? passwordError;

  EmailValidationState({
    this.email = '',
    this.password = '',
    this.isEmailValid = false,
    this.isPasswordValid = false,
    this.emailError,
    this.passwordError,
  });

  EmailValidationState copyWith({
    String? email,
    String? password,
    bool? isEmailValid,
    bool? isPasswordValid,
    String? emailError,
    String? passwordError,
  }) {
    return EmailValidationState(
      email: email ?? this.email,
      password: password ?? this.password,
      isEmailValid: isEmailValid ?? this.isEmailValid,
      isPasswordValid: isPasswordValid ?? this.isPasswordValid,
      emailError: emailError,
      passwordError: passwordError,
    );
  }
}

class EmailProvider extends StateNotifier<EmailValidationState> {
  EmailProvider() : super(EmailValidationState());

  void validateEmail(String email) {
    final emailRegex = RegExp(r'^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]+');
    bool isValid = false;
    String? error;

    if (email.isEmpty) {
      error = 'Email cannot be empty';
    } else if (!emailRegex.hasMatch(email)) {
      error = 'Invalid email format';
    } else if (!email.endsWith('@gmail.com')) {
      error = 'Only gmail.com addresses are allowed';
    } else {
      isValid = true;
    }

    state = state.copyWith(
      email: email,
      isEmailValid: isValid,
      emailError: error,
    );
  }

  void validatePassword(String password) {
    bool isValid = false;
    String? error;

    if (password.isEmpty) {
      error = 'Password cannot be empty';
    } else if (password.length < 8) {
      error = 'Password must be at least 8 characters';
    } else if (!password.contains(RegExp(r'[A-Z]'))) {
      error = 'Password must contain an uppercase letter';
    } else if (!password.contains(RegExp(r'[a-z]'))) {
      error = 'Password must contain a lowercase letter';
    } else if (!password.contains(RegExp(r'[0-9]'))) {
      error = 'Password must contain a number';
    } else if (!password.contains(RegExp(r'[!@#$%^&*(),.?":{}|<>]'))) {
      error = 'Password must contain a special character';
    } else {
      isValid = true;
    }

    state = state.copyWith(
      password: password,
      isPasswordValid: isValid,
      passwordError: error,
    );
  }

  bool get isFormValid => state.isEmailValid && state.isPasswordValid;
}

final emailProvider =
    StateNotifierProvider<EmailProvider, EmailValidationState>((ref) {
      return EmailProvider();
    });
