import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../data/repositories/mack_data.dart';

// State class for orders
class OrdersState {
  final List<dynamic> orders;
  final bool isLoading;
  final String? error;

  OrdersState({this.orders = const [], this.isLoading = true, this.error});

  OrdersState copyWith({
    List<dynamic>? orders,
    bool? isLoading,
    String? error,
  }) {
    return OrdersState(
      orders: orders ?? this.orders,
      isLoading: isLoading ?? this.isLoading,
      error: error,
    );
  }
}

// Orders notifier
class OrdersNotifier extends StateNotifier<OrdersState> {
  final ApiService _apiService;

  OrdersNotifier(this._apiService) : super(OrdersState()) {
    fetchOrders();
  }

  Future<void> fetchOrders() async {
    try {
      state = state.copyWith(isLoading: true, error: null);
      final data = await _apiService.fetchData('orders');
      state = state.copyWith(orders: data, isLoading: false);
    } catch (e) {
      state = state.copyWith(isLoading: false, error: e.toString());
    }
  }

  Future<void> deleteOrder(String id) async {
    try {
      await _apiService.deleteItem('orders', id);
      state = state.copyWith(
        orders: state.orders.where((order) => order['id'] != id).toList(),
      );
    } catch (e) {
      state = state.copyWith(error: e.toString());
    }
  }

  Future<void> updateOrder(String id, Map<String, dynamic> updatedData) async {
    try {
      final updatedOrder = await _apiService.updateItem(
        'orders',
        id,
        updatedData,
      );
      state = state.copyWith(
        orders:
            state.orders.map((order) {
              return order['id'] == id ? updatedOrder : order;
            }).toList(),
      );
    } catch (e) {
      state = state.copyWith(error: e.toString());
    }
  }
}

// Providers
final apiServiceProvider = Provider((ref) => ApiService());

final ordersProvider = StateNotifierProvider<OrdersNotifier, OrdersState>((
  ref,
) {
  final apiService = ref.watch(apiServiceProvider);
  return OrdersNotifier(apiService);
});
