import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:test_app/features/auth/domain/providers/auth_provider.dart';
import 'package:test_app/features/auth/domain/providers/email_provider.dart';
import 'package:test_app/features/presentation/screens/orders_screen.dart';

import 'utilities.dart';

class LoginTextField extends ConsumerStatefulWidget {
  const LoginTextField({super.key});

  @override
  ConsumerState<LoginTextField> createState() => _LoginTextFieldState();
}

class _LoginTextFieldState extends ConsumerState<LoginTextField> {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  void _handleSignIn() async {
    final validationState = ref.read(emailProvider);

    if (!validationState.isEmailValid || !validationState.isPasswordValid) {
      return;
    }

    await ref
        .read(authProvider.notifier)
        .signIn(emailController.text, passwordController.text);
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    final fieldWidth = size.width * 0.85;
    final maxWidth = 400.0;

    final validationState = ref.watch(emailProvider);
    final validator = ref.read(emailProvider.notifier);
    final authState = ref.watch(authProvider);

    return Scaffold(
      appBar: AppBar(),
      body: ListView(
        children: [
          Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,

            children: [
              Container(
                width: fieldWidth,
                constraints: BoxConstraints(maxWidth: maxWidth),
                child: TextField(
                  controller: emailController,
                  onChanged: (value) => validator.validateEmail(value),
                  decoration: InputDecoration(
                    hintText: 'Email',
                    prefixIcon: const Icon(Icons.email),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10),
                      borderSide: BorderSide(
                        color:
                            validationState.isEmailValid
                                ? Colors.green
                                : Colors.grey,
                      ),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10),
                      borderSide: BorderSide(
                        color:
                            validationState.isEmailValid
                                ? Colors.green
                                : Colors.blue,
                      ),
                    ),
                    errorText: validationState.emailError,
                  ),
                  keyboardType: TextInputType.emailAddress,
                ),
              ),
              SizedBox(height: size.height * 0.02),
              Container(
                width: fieldWidth,
                constraints: BoxConstraints(maxWidth: maxWidth),
                child: TextField(
                  controller: passwordController,
                  onChanged: (value) => validator.validatePassword(value),
                  decoration: InputDecoration(
                    hintText: 'Password',
                    prefixIcon: const Icon(Icons.lock),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10),
                      borderSide: BorderSide(
                        color:
                            validationState.isPasswordValid
                                ? Colors.green
                                : Colors.grey,
                      ),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10),
                      borderSide: BorderSide(
                        color:
                            validationState.isPasswordValid
                                ? Colors.green
                                : Colors.blue,
                      ),
                    ),
                    errorText: validationState.passwordError,
                  ),
                  obscureText: true,
                ),
              ),
              AppStyles.verticalSpacing(context),
              Row(
                children: [
                  Padding(
                    padding: const EdgeInsets.all(15.0),
                    child: Text(
                      "Password requirements\n"
                      "At least 8 characters\n"
                      "Contains at least one uppercase letter\n"
                      "Contains at least one lowercase letter\n"
                      "Contains at least one number\n"
                      "ontains at least one special character",
                      style: AppStyles.bodyText(context),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 24),

              if (authState.error != null)
                Padding(
                  padding: const EdgeInsets.only(bottom: 16),
                  child: Text(
                    authState.error!,
                    style: const TextStyle(color: Colors.red),
                  ),
                ),

              SizedBox(
                width: double.infinity,
                height: 50,
                child: ElevatedButton(
                  onPressed:
                      authState.isLoading
                          ? null
                          : () async {
                            _handleSignIn();

                            if (authState.status == AuthStatus.authenticated &&
                                mounted) {
                              Navigator.pushReplacement(
                                context,
                                MaterialPageRoute(
                                  builder: (context) => const OrdersScreen(),
                                ),
                              );
                            }
                          },
                  style: ElevatedButton.styleFrom(
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                  ),
                  child:
                      authState.isLoading
                          ? const SizedBox(
                            height: 20,
                            width: 20,
                            child: CircularProgressIndicator(
                              strokeWidth: 2,
                              valueColor: AlwaysStoppedAnimation<Color>(
                                Colors.white,
                              ),
                            ),
                          )
                          : const Text('Sign In'),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  @override
  void dispose() {
    emailController.dispose();
    passwordController.dispose();
    super.dispose();
  }
}
