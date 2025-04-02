import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:test_app/features/auth/domain/providers/order_provider.dart';

class OrdersScreen extends ConsumerWidget {
  const OrdersScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Orders',
          style: TextStyle(fontWeight: FontWeight.w600),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.search),
            onPressed: () {
              // TODO: Implement search
            },
          ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: () => ref.read(ordersProvider.notifier).fetchOrders(),
        child: Consumer(
          builder: (context, ref, child) {
            final ordersState = ref.watch(ordersProvider);

            if (ordersState.orders.isEmpty) {
              return Center(child: const CircularProgressIndicator());
            }

            return ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: ordersState.orders.length,
              itemBuilder: (context, index) {
                return _OrderItem(order: ordersState.orders[index]);
              },
            );
          },
        ),
      ),
    );
  }
}

class _OrderItem extends StatelessWidget {
  const _OrderItem({required this.order});

  final Map<String, dynamic> order;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Hero(
      tag: 'order_${order['id']}',
      child: Card(
        color: Colors.white,
        margin: const EdgeInsets.only(bottom: 16),
        child: InkWell(
          borderRadius: BorderRadius.circular(16),
          onTap: () {
            // TODO: Navigate to order details
          },
          child: Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(borderRadius: BorderRadius.circular(16)),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _OrderHeader(order: order),
                const Divider(height: 24),
                _OrderActions(order: order),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _OrderHeader extends StatelessWidget {
  const _OrderHeader({required this.order});

  final Map<String, dynamic> order;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Row(
      children: [
        CircleAvatar(
          backgroundColor: theme.colorScheme.secondary.withOpacity(0.1),
          child: Text(
            order['clientName']?[0]?.toUpperCase() ?? '?',
            style: TextStyle(color: Colors.black, fontWeight: FontWeight.w600),
          ),
        ),
        const SizedBox(width: 16),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                order["clientName"] ?? "",
                style: theme.textTheme.titleMedium,
              ),
              const SizedBox(height: 4),
              Text(order["address"] ?? "", style: theme.textTheme.bodyMedium),
            ],
          ),
        ),
      ],
    );
  }
}

class _OrderActions extends ConsumerWidget {
  const _OrderActions({required this.order});

  final Map<String, dynamic> order;

  Future<bool?> _showDeleteConfirmation(BuildContext context) {
    return showDialog<bool>(
      context: context,
      builder:
          (context) => AlertDialog(
            title: const Text('Delete Order'),
            content: const Text('Are you sure you want to delete this order?'),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(context, false),
                child: const Text('CANCEL'),
              ),
              TextButton(
                style: TextButton.styleFrom(foregroundColor: Colors.red),
                onPressed: () => Navigator.pop(context, true),
                child: const Text('DELETE'),
              ),
            ],
          ),
    );
  }

  Future<void> _showEditDialog(BuildContext context, WidgetRef ref) {
    final TextEditingController nameController = TextEditingController(
      text: order['clientName'],
    );
    final TextEditingController addressController = TextEditingController(
      text: order['address'],
    );

    return showDialog(
      context: context,
      builder:
          (context) => AlertDialog(
            title: const Text('Edit Order'),
            content: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextField(
                  controller: nameController,
                  decoration: const InputDecoration(labelText: 'Client Name'),
                ),
                const SizedBox(height: 8),
                TextField(
                  controller: addressController,
                  decoration: const InputDecoration(labelText: 'Address'),
                ),
              ],
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.pop(context),
                child: const Text('CANCEL'),
              ),
              TextButton(
                onPressed: () {
                  ref.read(ordersProvider.notifier).updateOrder(order['id'], {
                    ...order,
                    'clientName': nameController.text,
                    'address': addressController.text,
                  });
                  Navigator.pop(context);
                },
                child: const Text('SAVE'),
              ),
            ],
          ),
    );
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final theme = Theme.of(context);

    return Row(
      mainAxisAlignment: MainAxisAlignment.end,
      children: [
        TextButton.icon(
          icon: Icon(Icons.edit_outlined, color: theme.colorScheme.secondary),
          label: Text('Edit', style: TextStyle(color: Colors.blue)),
          onPressed: () => _showEditDialog(context, ref),
        ),
        const SizedBox(width: 8),
        FilledButton.icon(
          icon: const Icon(Icons.delete_outline, size: 20),
          label: const Text('Delete'),
          style: FilledButton.styleFrom(
            backgroundColor: Colors.red.shade50,
            foregroundColor: Colors.red,
            padding: const EdgeInsets.symmetric(horizontal: 16),
          ),
          onPressed: () async {
            final shouldDelete = await _showDeleteConfirmation(context);
            if (shouldDelete ?? false) {
              if (context.mounted) {
                ref.read(ordersProvider.notifier).deleteOrder(order['id']);
              }
            }
          },
        ),
      ],
    );
  }
}
