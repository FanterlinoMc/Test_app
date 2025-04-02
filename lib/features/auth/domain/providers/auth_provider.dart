import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../models/user.dart';

enum AuthStatus { initial, authenticated, unauthenticated }

class AuthState {
  final AuthStatus status;
  final User? user;
  final bool isLoading;
  final String? error;

  const AuthState({
    this.status = AuthStatus.initial,
    this.user,
    this.isLoading = false,
    this.error,
  });

  AuthState copyWith({
    AuthStatus? status,
    User? user,
    bool? isLoading,
    String? error,
  }) {
    return AuthState(
      status: status ?? this.status,
      user: user ?? this.user,
      isLoading: isLoading ?? this.isLoading,
      error: error,
    );
  }
}

class AuthNotifier extends StateNotifier<AuthState> {
  AuthNotifier() : super(const AuthState());

  Future<void> signIn(String email, String password) async {
    try {
      state = state.copyWith(isLoading: true, error: null);

      // Simulate API call
      await Future.delayed(const Duration(seconds: 2));

      // TODO: Replace with your actual API authentication
      if (email == "test@gmail.com" && password == "Password123!") {
        final user = User(
          id: '1',
          email: email,
          name: 'Test User',
          token: 'dummy_token',
        );

        state = state.copyWith(
          status: AuthStatus.authenticated,
          user: user,
          isLoading: false,
        );
      } else {
        throw Exception('Invalid credentials');
      }
    } catch (e) {
      state = state.copyWith(
        status: AuthStatus.unauthenticated,
        error: e.toString(),
        isLoading: false,
      );
    }
  }

  void signOut() {
    state = const AuthState(status: AuthStatus.unauthenticated);
  }
}

final authProvider = StateNotifierProvider<AuthNotifier, AuthState>((ref) {
  return AuthNotifier();
});
