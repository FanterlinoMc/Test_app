import 'package:flutter/material.dart';
import 'package:test_app/features/presentation/widgets/login_textfield.dart';




class Home extends StatelessWidget {
  const Home({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(appBar: AppBar(), body: LoginTextField());
  }
}
