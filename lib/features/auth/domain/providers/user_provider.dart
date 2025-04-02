import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../data/repositories/user_repository.dart';
import '../models/user.dart';

class UserState {
  final User? user;
  final bool isLoading;
  final String? error;

  UserState({this.user, this.isLoading = false, this.error});

  bool get isAuthenticated => user != null;

  UserState copyWith({User? user, bool? isLoading, String? error}) {
    return UserState(
      user: user ?? this.user,
      isLoading: isLoading ?? this.isLoading,
      error: error,
    );
  }
}

class UserNotifier extends StateNotifier<UserState> {
  final UserRepository _repository;

  UserNotifier(this._repository) : super(UserState()) {
    _init();
  }

  Future<void> _init() async {
    try {
      state = state.copyWith(isLoading: true);
      final user = await _repository.getUser();
      state = state.copyWith(user: user, isLoading: false);
    } catch (e) {
      state = state.copyWith(error: e.toString(), isLoading: false);
    }
  }

  Future<void> login(User user) async {
    try {
      state = state.copyWith(isLoading: true);
      await _repository.saveUser(user);
      state = state.copyWith(user: user, isLoading: false);
    } catch (e) {
      state = state.copyWith(error: e.toString(), isLoading: false);
    }
  }

  Future<void> logout() async {
    try {
      state = state.copyWith(isLoading: true);
      await _repository.deleteUser();
      state = state.copyWith(user: null, isLoading: false);
    } catch (e) {
      state = state.copyWith(error: e.toString(), isLoading: false);
    }
  }
}

final userRepositoryProvider = Provider((ref) => UserRepository());

final userProvider = StateNotifierProvider<UserNotifier, UserState>((ref) {
  final repository = ref.watch(userRepositoryProvider);
  return UserNotifier(repository);
});
