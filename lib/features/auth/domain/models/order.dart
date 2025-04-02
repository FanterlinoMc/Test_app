class Order {
  final String id;
  final String clientName;
  final String address;

  Order({required this.id, required this.clientName, required this.address});

  factory Order.fromJson(Map<String, dynamic> json) {
    return Order(
      id: json['id'] ?? '',
      clientName: json['clientName'] ?? '',
      address: json['address'] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {'id': id, 'clientName': clientName, 'address': address};
  }
}
