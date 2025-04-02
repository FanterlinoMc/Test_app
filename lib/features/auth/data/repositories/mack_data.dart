import 'package:dio/dio.dart';

class ApiService {
  final Dio _dio = Dio();
  final String baseUrl = 'https://67ecbb8baa794fb3222ea13c.mockapi.io/testv1';

  Future<List<dynamic>> fetchData(String endpoint) async {
    try {
      final response = await _dio.get('$baseUrl/$endpoint');

      if (response.statusCode == 200) {
        return response.data as List<dynamic>;
      } else {
        throw Exception('Failed to load data: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error fetching data: $e');
    }
  }

  Future<Map<String, dynamic>> fetchSingleItem(
    String endpoint,
    String id,
  ) async {
    try {
      final response = await _dio.get('$baseUrl/$endpoint/$id');

      if (response.statusCode == 200) {
        return response.data as Map<String, dynamic>;
      } else {
        throw Exception('Failed to load item: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error fetching item: $e');
    }
  }

  Future<Map<String, dynamic>> createItem(
    String endpoint,
    Map<String, dynamic> data,
  ) async {
    try {
      final response = await _dio.post('$baseUrl/$endpoint', data: data);

      if (response.statusCode == 201) {
        return response.data as Map<String, dynamic>;
      } else {
        throw Exception('Failed to create item: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error creating item: $e');
    }
  }

  Future<Map<String, dynamic>> updateItem(
    String endpoint,
    String id,
    Map<String, dynamic> data,
  ) async {
    try {
      final response = await _dio.put('$baseUrl/$endpoint/$id', data: data);

      if (response.statusCode == 200) {
        return response.data as Map<String, dynamic>;
      } else {
        throw Exception('Failed to update item: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error updating item: $e');
    }
  }

  Future<void> deleteItem(String endpoint, String id) async {
    try {
      final response = await _dio.delete('$baseUrl/$endpoint/$id');

      if (response.statusCode != 200) {
        throw Exception('Failed to delete item: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Error deleting item: $e');
    }
  }
}
