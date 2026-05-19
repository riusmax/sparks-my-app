import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useAuth } from '@/contexts/auth-context';
import { useTheme } from '@/hooks/use-theme';

export default function AuthScreen() {
  const theme = useTheme()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { state, actions } = useAuth()

  const disabled = state.loading || email.length === 0 || password.length === 0;

  const handleSubmit = () => {
    if (disabled) return;
    actions.login(email.trim(), password);
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.form}
        >
          <ThemedText type="title" style={styles.title}>
            Connexion
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.subtitle}>
            Connectez-vous pour accéder à votre compte
          </ThemedText>

          <ThemedText type="smallBold">Email</ThemedText>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="vous@exemple.com"
            placeholderTextColor={theme.textSecondary}
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            textContentType="emailAddress"
            editable={!state.loading}
            style={[
              styles.input,
              { backgroundColor: theme.backgroundElement, color: theme.text },
            ]}
          />

          <ThemedText type="smallBold">Mot de passe</ThemedText>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            placeholderTextColor={theme.textSecondary}
            autoCapitalize="none"
            autoComplete="current-password"
            secureTextEntry
            textContentType="password"
            editable={!state.loading}
            onSubmitEditing={handleSubmit}
            returnKeyType="go"
            style={[
              styles.input,
              { backgroundColor: theme.backgroundElement, color: theme.text },
            ]}
          />

          {state.error ? (
            <ThemedText type="small" style={styles.error}>
              Échec de la connexion. Vérifiez vos identifiants.
            </ThemedText>
          ) : null}

          <Pressable
            onPress={handleSubmit}
            // disabled={disabled}
            style={({ pressed }) => {
              let opacity = 1;
              if (disabled) opacity = 0.5;
              else if (pressed) opacity = 0.85;
              return [styles.button, { backgroundColor: theme.text, opacity }];
            }}
          >
            {state.loading ? (
              <ActivityIndicator color={theme.background} />
            ) : (
              <ThemedText type="smallBold" style={{ color: theme.background }}>
                Se connecter
              </ThemedText>
            )}
          </Pressable>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    justifyContent: 'center',
  },
  form: {
    gap: Spacing.two,
  },
  title: {
    marginBottom: Spacing.one,
  },
  subtitle: {
    marginBottom: Spacing.four,
  },
  input: {
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
    fontSize: 16,
  },
  button: {
    marginTop: Spacing.three,
    borderRadius: Spacing.two,
    paddingVertical: Spacing.three,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    color: '#e5484d',
    marginTop: Spacing.one,
  },
});
