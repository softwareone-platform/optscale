# FFC: TDR FinOps for Cloud MFA

> Polskie tłumaczenie dokumentu [`FFC- TDR FinOps for Cloud MFA.md`](<FFC- TDR FinOps for Cloud MFA.md>).
> Wersją obowiązującą jest oryginał angielski — w razie rozbieżności rozstrzyga on.
> Nazwy pól, enumów, endpointów, kodów błędów i przykłady JSON pozostawiono w oryginale.

| **PM** | @Pokarowski, Tomasz |
| --- | --- |
| **Business design review** | [FFC: Multi‑Factor Authentication (MFA) & Single Sign‑On (SSO)](https://softwareone.atlassian.net/wiki/spaces/mpt/pages/7517831464/FFC+Multi+Factor+Authentication+MFA+Single+Sign+On+SSO) |
| **Architekt** | @Faraone, Francesco |
| **Zespół deweloperski** | [MPT - Turing](https://softwareone.atlassian.net/people/team/2db3732c-37ab-485d-85e5-83964391a3db) (@Aleksandra Ovchinnikova (Deactivated)@Di Mariano, Antonio@Faraone, Francesco@Wolosz, Dawid@Zielonka, Michal) |
| **Nagranie prezentacji** | link do nagrania ze spotkania |
| **Data prezentacji** | termin, w którym odbędzie się prezentacja |
| **Epik/zadanie** | [MPT-25258](https://softwareone.atlassian.net/browse/MPT-25258) |

# Spis treści

# Wprowadzenie

FinOps for Cloud obsługuje obecnie uwierzytelnianie użytkowników adresem e-mail i hasłem (logowanie przez Google/Microsoft istnieje w OptScale, ale nie jest używane we wdrożeniu FFC), w zamian za co użytkownik otrzymuje długożyjący token bearer z serwisu `auth`. Nie ma drugiego składnika uwierzytelniania, a organizacja nie ma możliwości go wymusić. Klienci korporacyjni coraz częściej stawiają MFA jako warunek wstępny onboardingu, a ci sami klienci będą później pytać o SSO — BDR omawia je łącznie z MFA.

Ten TDR obejmuje część BDR dotyczącą MFA i proponuje zaimplementowanie jej natywnie w optscale, w serwisie `auth`, który już dziś jest właścicielem tożsamości, tokenów oraz kodów weryfikacyjnych e-mail używanych przy odzyskiwaniu hasła. Użytkownicy będą mogli dodać aplikację uwierzytelniającą (TOTP) i/lub jednorazowy kod e-mail jako drugi składnik. Logowanie staje się dwuetapowe (e-mail → *Continue* → hasło → kod), co będzie jednocześnie punktem wejścia dla SSO. Organizacja będzie mogła wymusić MFA poprzez politykę uwierzytelniania ustawianą w portalu przez managera organizacji.

SSO oraz zmiany w UI są **poza zakresem** tego TDR-a — opisane jest tu wyłącznie API optscale.

# Wymagania

## Wymagania funkcjonalne

- Logowanie musi być dwuetapowe: użytkownik podaje e-mail i klika **Continue**; system rozstrzyga metodę uwierzytelniania dla tego adresu. Przed kliknięciem *Continue* nie następuje żadne przekierowanie.
- Jeżeli użytkownik ma co najmniej jedną potwierdzoną metodę MFA albo MFA jest wymuszone przez organizację, przed wydaniem tokena wymagana jest weryfikacja MFA. MFA dotyczy wyłącznie uwierzytelniania lokalnego.
- Użytkownik może skonfigurować MFA na nowej stronie **Profile → Security**. Obsługiwane metody to aplikacja uwierzytelniająca oraz kod weryfikacyjny e-mail.
- Rejestracja aplikacji uwierzytelniającej pokazuje kod QR oraz klucz do ręcznego wpisania (w tym przypadku użytkownik musi podać poprawny 6-cyfrowy kod); metoda jest zapisywana jako aktywna dopiero po udanej weryfikacji.
- Nowa strona bezpieczeństwa wyświetla skonfigurowane metody. Jeśli MFA jest włączone, musi zostać dodana co najmniej jedna metoda i ustawiona jako domyślna; możliwe jest dodawanie, usuwanie oraz ustawianie metody domyślnej.
- Podczas logowania metoda domyślna jest wstępnie wybrana, a użytkownik może zdecydować się na inną. Dostęp jest przyznawany dopiero po potwierdzeniu poprawnym kodem.
- MFA konfiguruje się per użytkownik i jest dostępne dla wszystkich ról.
- Organizacja może wymusić MFA. W takim przypadku jest ono obowiązkowe dla wszystkich jej użytkowników, a użytkownik bez metody musi ją zarejestrować, zanim zostanie wydany pierwszy token.
- Użytkownik należący do kilku organizacji jest traktowany jako objęty wymuszeniem, jeżeli którakolwiek z nich wymusza MFA.

## Wymagania integracyjne

- Zarządzanie politykami oraz reset MFA są wystawione jako endpointy chronione cluster secret na `auth` (nagłówek `Secret`, ten sam mechanizm co w istniejących wywołaniach service-to-service).
- Kody e-mail są wysyłane przez `herald` (`auth` otrzymuje zależność `herald-client`).
- Do obsługi haseł jednorazowych należy użyć biblioteki `pyotp`.

# Makiety

Nowa strona *Profile → Security*

Konfiguracja MFA


MFA podczas logowania

MFA wymuszone, ale nieskonfigurowane



# Przegląd rozwiązania

Cała logika MFA jest dodawana do serwisu `auth`. Zmieni ona proces wydawania tokenów i wprowadzi challenge'e (na razie MFA, w przyszłości SSO).

Obecnie tokeny są tworzone przez `POST /auth/v2/tokens` — endpoint waliduje poświadczenia i natychmiast zapisuje wiersz w tabeli Token. Walidacja sprowadza się do prostego sprawdzenia, czy wiersz tokena istnieje, oraz do weryfikacji macaroona **bez inspekcji caveatów**. Dlatego stan pośredni potrzebny dla challenge'a nie może być tokenem jakiegokolwiek rodzaju. Zamiast tego kontroler tokenów, po istniejącym pomyślnym sprawdzeniu użytkownika, powinien odpytać nowy `MfaController`, czy MFA ma zastosowanie:

- jeśli użytkownik ma co najmniej jedną potwierdzoną metodę — tworzony jest `LoginChallenge` w stanie `mfa_required` i zwracana jest odpowiedź `202` z challenge'em oraz listą metod;
- jeśli nie ma żadnej, ale organizacja wymusza MFA — challenge w stanie `enrollment_required` z odpowiedzią `202` i stroną do skonfigurowania metody;
- w pozostałych przypadkach — odpowiedź `201` z tokenem, dokładnie jak w obecnej implementacji.

Klient następnie woła `POST /auth/v2/tokens` ponownie, podając `challenge_id` + `code` + `method_id`. Po powodzeniu challenge jest konsumowany, a `create_user_token` wydaje macaroona z caveatem `mfa:<totp|email>`. Obsługa tokenów pozostaje więc dokładnie w jednej metodzie.

## Rozstrzyganie wymuszenia

Wymuszenie MFA jest właściwością organizacji i będzie przechowywane jako polityka uwierzytelniania. Przy logowaniu `auth` sprawdza organizacje, do których należy użytkownik, i weryfikuje, czy którakolwiek z nich ma wymuszone MFA — jeśli co najmniej jedna ma, użytkownik jest traktowany jako objęty wymuszeniem. Obiekt polityki powinien być na tyle ogólny, aby mógł później przechowywać ustawienia na poziomie domeny oraz konfigurację SSO bez wprowadzania nowego modelu.

## Wymuszenie bez skonfigurowanej metody

Jeżeli objęty wymuszeniem użytkownik zaloguje się poprawnym hasłem, ale nie ma jeszcze drugiego składnika, system nie wydaje tokena. Zwraca zamiast tego krótkożyjący challenge `enrollment_required`, a UI prowadzi użytkownika wprost do okna dodania metody uwierzytelniania. Ten challenge jest dowodem, że hasło zostało już zweryfikowane, i to on autoryzuje wywołania enrollmentu przez kolejne pięć minut — żadna sesja nie istnieje, dopóki drugi składnik nie zostanie skonfigurowany. Gdy tylko metoda zostanie potwierdzona, to samo żądanie zwraca token i użytkownik wchodzi do portalu bez ponownego logowania.

## Jednorazowy kod e-mail

Kody e-mail są zbudowane na mechanizmie używanym już przy odzyskiwaniu hasła i weryfikacji adresu e-mail. Korzystają z tego samego magazynu, ograniczania częstotliwości (throttling) oraz unieważniania poprzednich kodów. Kody MFA są oznaczone własnym `purpose` i żyją dziesięć minut, dzięki czemu kod wydany na potrzeby odzyskiwania hasła nigdy nie może posłużyć do przejścia MFA ani odwrotnie. Serwis `auth` sam wysyła wiadomość przez `herald`, korzystając z dedykowanego szablonu.

## Aplikacja uwierzytelniająca

Kody z aplikacji uwierzytelniającej są zgodne ze standardowym algorytmem TOTP (RFC 6238) z domyślnymi parametrami, dzięki czemu Microsoft Authenticator, Google Authenticator, Authy i 1Password działają bez integracji specyficznych dla dostawcy. Podczas rejestracji serwer generuje sekret współdzielony i zwraca go jednorazowo, razem ze standardowym URI provisioningowym; przeglądarka renderuje z tego URI kod QR i pokazuje klucz do ręcznego wpisania jako rozwiązanie zapasowe. Kod jest akceptowany tylko raz i w obrębie niewielkiej tolerancji czasowej.

## Działania operatorskie

Reset MFA użytkownika jest wystawiony jako operacja service-to-service na `auth`, chroniona cluster secret, dzięki czemu proces obsługi zgłoszeń wsparcia może być realizowany przez narzędzia wewnętrzne bez żadnego UI.

# Przebieg procesu logowania

## Proces logowania

**Co zwraca challenge **`202`**.** W obu stanach ciało odpowiedzi to ten sam obiekt: `challenge_id` (jednorazowy, ważny 5 lub 10 minut), `state` (`mfa_required` albo `enrollment_required`), `expires_at`, `user_email`, `methods` (potwierdzone metody użytkownika z `id`, `type`, `label`, `is_default`), `default_method_id` oraz `code_sent`. Na tym etapie nie jest wydawany żaden token.

**Zamawianie kodu e-mail podczas logowania.** Jeżeli metodą domyślną jest e-mail, kod jest wysyłany razem z odpowiedzią `202`. Jeżeli użytkownik przełączy się na e-mail przez *Use a different method* (albo kliknie *Resend*), nowy kod zostanie wysłany po walidacji osobnym wywołaniem API. Dla aplikacji uwierzytelniającej nic nie jest wysyłane — generuje ona kod lokalnie.

## Challenge MFA

## Rejestracja MFA (w tym prosty scenariusz dodania metody MFA)

# Schemat modelu

### MFAMethod

| **Pole** | **Typ** | **Ograniczenia** | **Przykład** | **Opis** |
| --- | --- | --- | --- | --- |
| `id` | string (uuid) | READONLY | `d6ce1bbd-c150-47dc-bde7-c8027f1d1724` | Identyfikator metody |
| `user_id` | string | FK do `user.id` | `fd41f952-279b-49dc-8a9f-5dafc55ee1ca` | Właściciel metody |
| `type` | enum | `topt email` — jedna aktywna metoda danego typu na użytkownika | `totp` | Typ metody |
| `secret` | string | OPCJONALNE — zwracane wyłącznie w odpowiedzi POST dla `totp` | `JBSWY3DPEHPK3PXP` | Sekret współdzielony TOTP, przechowywany zaszyfrowany |
| `label` | string | OPCJONALNE | `Configured on Google Pixel 10 Pro` | Dowolny tekst wyświetlany pod metodą (informacja o urządzeniu) |
| `is_default` | boolean |  | `true` | Metoda wstępnie wybrana przy logowaniu |
| `confirmed_at` | integer (unix timestamp) | domyślnie `0` (oczekująca) | `1758480000` | Kiedy kod rejestracyjny został zweryfikowany. Wiersze oczekujące starsze niż 15 min są odrzucane |
| `last_used_step` | integer | not null, domyślnie `0`, tylko TOTP | `58616000` | Ochrona przed powtórzeniem (replay) |
| `created_at` | integer (unix timestamp) |  | `1758480000` | Czas utworzenia |
| `deleted_at` | integer (unix timestamp) | domyślnie `0` (= nieusunięta) | `0` | Czas usunięcia |

### LoginChallenge

| **Pole** | **Typ** | **Ograniczenia** | **Przykład** | **Opis** |
| --- | --- | --- | --- | --- |
| `id` | string (uuid) | READONLY | `d6ce1bbd-c150-47dc-bde7-c8027f1d1724` | Identyfikator challenge'a |
| `user_id` | string | FK do `user.id` | `fd41f952-279b-49dc-8a9f-5dafc55ee1ca` | Użytkownik, który przeszedł weryfikację hasła |
| `state` | enum | `mfa_required enrollment_required` | `mfa_required` | Czy użytkownik musi się zweryfikować, czy najpierw zarejestrować metodę |
| `expires_at` | integer (unix timestamp) | czas utworzenia + 5 lub 10 minut | `1758480000` | Wygaśnięcie challenge'a; wiersze wygasłe są ignorowane i czyszczone leniwie |
| `attempts` | integer | domyślnie `0`, maks. `5` | `3` | Nieudane wpisania kodu; przy 5. porażce wiersz jest konsumowany jako nieudany |
| `created_at` | integer (unix timestamp) |  | `1758480000` | Czas utworzenia |
| `deleted_at` | integer (unix timestamp) | domyślnie `0` (= nieusunięty) | `0` | Ustawiane, gdy challenge zostaje skonsumowany (wydano token, potwierdzono pierwszą metodę, reset operatorski) albo zablokowany |

### AuthPolicy

| **Pole** | **Typ** | **Ograniczenia** | **Przykład** | **Opis** |
| --- | --- | --- | --- | --- |
| `id` | string (uuid) | READONLY | `d6ce1bbd-c150-47dc-bde7-c8027f1d1724` | Identyfikator polityki |
| `scope_type` | enum | `organization domain` — wartość `domain` będzie potrzebna później dla SSO | `organization` | Rodzaj zakresu, którego dotyczy polityka |
| `scope_id` | string |  | `d6ce1bbd-c150-47dc-bde7-c8027f1d1724` | Id organizacji (`Assignment.resource_id`) |
| `purpose` | enum | `mfa sso` | `mfa` | Członkowie tego zakresu muszą przejść MFA przy logowaniu lokalnym |
| `created_at` | integer (unix timestamp) |  | `1758480000` | Czas utworzenia |
| `deleted_at` | integer (unix timestamp) | domyślnie `0` (= nieusunięta) | `0` | Czas usunięcia |

### Verification code

Nowe pole w istniejącym modelu VerificationCode

| **Pole** | **Typ** | **Ograniczenia** | **Przykład** | **Opis** |
| --- | --- | --- | --- | --- |
| `purpose` | enum | `password mfa` | `mfa` | Oddziela kody MFA od kodów odzyskiwania/weryfikacji, tak aby jeden nigdy nie mógł zastąpić drugiego |

# API

Wszystkie endpointy będą zaimplementowane pod `/auth/v2`. Format błędu to istniejący format optscale (`{"error": {"error_code": "OA00xx", "reason": "…"}}`).

## Reprezentacja obiektów

#### MfaMethod

| **Pole** | **Typ** | **Przykład** | **Opis** |
| --- | --- | --- | --- |
| `id` | string (uuid) | `a1d3…` |  |
| `type` | enum | `totp` | `totp` albo `email` |
| `label` | string | `Configured on Google Pixel 10 Pro` | Dowolny tekst wyświetlany pod metodą (informacja o urządzeniu). Dla `email` serwer ustawia zamaskowany adres |
| `is_default` | boolean | `true` |  |
| `confirmed` | boolean | `true` | `false`, dopóki kod rejestracyjny nie został wpisany. Źródło: `MFAMethod.confirmed_at > 0` |
| `created_at` | integer (unix ts) | `1758480000` |  |
| `secret` | string (base32) | `JBSWY3DPEHPK3PXP` |  |
| `otpauth_uri` | string | `otpauth://totp/FinOps%20for%20Cloud:reto…?secret=…&issuer=FinOps%20for%20Cloud&digits=6&period=30` | Renderowane przez przeglądarkę jako kod QR, budowane przy rejestracji: `otpauth://totp/{issuer}:{user.email}?secret={secret}&issuer={issuer}&digits=6&period=30` |

#### MfaStatus

| **Pole** | **Typ** | **Przykład** | **Opis** |
| --- | --- | --- | --- |
| `methods` | MfaMethod\[\] | `[…]` | Metody pokazywane na stronie Security |
| `mfa_enforced` | boolean | `true` | Czy którakolwiek z organizacji użytkownika wymusza MFA |
| `enforcing_organizations` | string\[\] | `["4f1e…"]` | Organizacje wymuszające (na potrzeby tooltipa „Enforced by organization") |
| `status` | enum | `enforced` | `enforced`, `configured` albo `not_configured`. |

#### LoginChallenge

| **Pole** | **Typ** | **Przykład** | **Opis** |
| --- | --- | --- | --- |
| `challenge_id` | string | `6d2f…` |  |
| `state` | enum | `mfa_required` | `mfa_required` albo `enrollment_required` |
| `expires_at` | integer (unix timestamp) | `1758480300` |  |
| `user_email` | string | `reto.mayer@example.com` | Na potrzeby „Signing in as …" |
| `methods` | MfaMethod\[\] | `[…]` | Potwierdzone metody do wyboru; dla enrollmentu lista jest pusta |
| `default_method_id` | string \| null | `a1d3…` |  |
| `code_sent` | boolean | `true` | Informuje UI, żeby nie zamawiało kodu ponownie. `true`, jeśli metodą domyślną jest `email` i kod został wysłany przy tworzeniu challenge'a |
| `attempts_left` | integer | `5` |  |

#### AuthPolicy

| **Pole** | **Typ** | **Przykład** | **Opis** |
| --- | --- | --- | --- |
| `scope_type` | enum | `organization` | `organization` albo `domain` |
| `scope_id` | string | `4f1e…` | Id organizacji |
| `purpose` | enum | `mfa` | `mfa` albo `sso` |
| `updated_at` | integer (unix timestamp) \| null | `1758480000` |  |

#### LoginOptions

| **Pole** | **Typ** | **Przykład** | **Opis** |
| --- | --- | --- | --- |
| `methods` | string\[\] | `["password"]` | Metody oferowane po *Continue*. Do czasu wprowadzenia SSO będzie to stała `["password"]`, później wyliczane z polityki `domain` dla domeny adresu e-mail |
| `sso` | object | `{"state":"not_configured"}` | Zarezerwowane na rozstrzyganie SSO |

#### Token

| **Pole** | **Typ** | **Przykład** | **Opis** |
| --- | --- | --- | --- |
| `token` | string | `MDAxY…` | Macaroon budowany przez `MacaroonToken.create()`; teraz dojdzie caveat `mfa:<type>`, gdzie type to totp, email albo none. |

Plus istniejące już pola `user_id`, `user_email`, `valid_until`, `ip`, `digest`, `created_at`.

## Definicja API

| **Metoda** | **Endpoint** | **Funkcja** | **Wyjaśnienie** |
| --- | --- | --- | --- |
| POST | `/auth/v2/login_options` | Rozstrzygnięcie opcji logowania | Krok 1 dwuetapowego logowania. Przyjmuje `{email}`, zwraca [LoginOptions](https://softwareone.atlassian.net/wiki/spaces/mpt/pages/edit-v2/7959379996#LoginOptions). |
| POST | `/auth/v2/tokens` | Uzyskanie tokena (istniejące) | `{email, password}` albo `{email, verification_code}` → `201 Token` albo `202 LoginChallenge`, gdy MFA ma zastosowanie. |
| POST | `/auth/v2/tokens` | Domknięcie challenge'a MFA | `{challenge_id, code, method_id?}` → weryfikuje kod, konsumuje challenge, zwraca `201 Token` z caveatem `mfa:<type>`. |
| POST | `/auth/v2/login_challenges/{challenge_id}/codes` | Wysłanie kodu e-mail dla challenge'a | `{method_id}` metody typu `email` → wysyła OTP przez herald. Ograniczone częstotliwościowo (1/min). `204` |
| GET | `/auth/v2/users/{user_id}/mfa_methods` | Pobranie metod MFA | Zwraca [MfaStatus](https://softwareone.atlassian.net/wiki/spaces/mpt/pages/edit-v2/7959379996#MfaStatus) |
| POST | `/auth/v2/users/{user_id}/mfa_methods` | Rozpoczęcie rejestracji | `{type, label?}` → `201 MfaMethod` (oczekująca). Dla `totp` zawiera `secret` + `otpauth_uri`, dla `email` dodatkowo wysyła kod |
| POST | `/auth/v2/users/{user_id}/mfa_methods/{method_id}/confirm` | Potwierdzenie rejestracji | `{code, challenge_id?}` → `200 MfaMethod` (potwierdzona). Z `challenge_id` → `201 {method, token}`. Pierwsza potwierdzona metoda staje się domyślną |
| PATCH | `/auth/v2/users/{user_id}/mfa_methods/{method_id}` | Aktualizacja metody | `{is_default?}`, `{label?}` → `200 MfaMethod` |
| DELETE | `/auth/v2/users/{user_id}/mfa_methods/{method_id}` | Usunięcie metody | `204` |
| DELETE | `/auth/v2/users/{user_id}/mfa_methods` | Reset MFA (dostępne dla admina organizacji) | Miękko usuwa wszystkie metody użytkownika i unieważnia jego token, `204` |
| GET | `/auth/v2/auth_policies?scope_type=organization&scope_id={org_id}` | Lista polityk | Zwraca [AuthPolicy](https://softwareone.atlassian.net/wiki/spaces/mpt/pages/edit-v2/7959379996#AuthPolicy) |
| POST | `/auth/v2/auth_policies` | Utworzenie polityki (dostępne dla managera organizacji) | `{scope_type, scope_id, purpose}` → `201 AuthPolicy` |
| DELETE | `/auth/v2/auth_policies/{policy_id}` | Usunięcie polityki (dostępne dla managera organizacji) | Miękko usuwa wiersz, `204` |

#### Rozstrzygnięcie opcji logowania

Żądanie

```
POST /auth/v2/login_options
{ "email": "finops.ffc@example.com" }
```

Odpowiedź `200`

```json
{ "methods": ["password"], "sso": { "state": "not_configured" } }
```

#### Uzyskanie tokena — MFA ma zastosowanie

Żądanie

```
POST /auth/v2/tokens
{ "email": "finops.ffc@example.com", "password": "•••" }
```

Odpowiedź `202`

```json
{
  "challenge_id": "6d2f4c0e-3b1a-4b7e-9d1e-0f4c2a6b8e91",
  "state": "mfa_required",
  "expires_at": 1758480300,
  "user_email": "finops.ffc@example.com",
  "methods": [
    { "id": "a1d3…", "type": "totp",  "label": "Configured on Google Pixel 10 Pro", "is_default": true,  "confirmed": true },
    { "id": "b2e4…", "type": "email", "label": "fi***@example.com",                "is_default": false, "confirmed": true }
  ],
  "default_method_id": "a1d3…",
  "code_sent": false,
  "attempts_left": 5
}
```

Odpowiedź `202` — MFA wymuszone, nic nieskonfigurowane

```json
{ 
  "challenge_id": "…",
  "state": "enrollment_required",
  "expires_at": 1758480300,
  "user_email": "finops.ffc@example.com",
  "methods": [],
  "default_method_id": null,
  "code_sent": false,
  "attempts_left": 5
}
```

#### Domknięcie challenge'a MFA

Żądanie

```
POST /auth/v2/tokens
{ "challenge_id": "6d2f4c0e-…", "method_id": "a1d3…", "code": "482913" }
```

Odpowiedź `201` — to samo ciało co w dzisiejszej odpowiedzi tokenowej, macaroon niesie `mfa:totp`.

```json
{ 
  "token": "MDAxY…",
  "user_id": "9c2a…",
  "user_email": "finops.ffc@example.com",
  "created_at": "2026-09-22T09:00:00",
  "valid_until": "2026-09-29T09:00:00",
  "digest": "…"
}
```

Błędy: `403` zły kod albo brak kolejnych prób, `404` nieznany/wygasły/skonsumowany challenge.

#### Wysłanie kodu e-mail dla challenge'a

Żądanie

```
POST /auth/v2/login_challenges/6d2f4c0e-…/codes
{ "method_id": "b2e4…" }
```

Odpowiedź `204`

Błędy: `403` kod zamówiony mniej niż minutę temu, albo `404`

#### Pobranie statusu MFA

Żądanie

```
GET /auth/v2/users/9c2a…/mfa_methods
```

Odpowiedź `200`

```json
{
  "methods": [
    { 
      "id": "a1d3…",
      "type": "totp",
      "label": "Configured on Google Pixel 10 Pro",
      "is_default": true,
      "confirmed": true,
      "created_at": 1758400000
    }
  ],
  "mfa_enforced": true,
  "enforcing_organizations": ["4f1e…"],
  "status": "enforced"
}
```

#### Rozpoczęcie rejestracji (aplikacja uwierzytelniająca)

Żądanie

```
POST /auth/v2/users/9c2a…/mfa_methods
{ "type": "totp", "label": "Configured on Google Pixel 10 Pro" }
```

Odpowiedź `201`

```json
{ 
  "id": "a1d3…",
  "type": "totp",
  "label": "Configured on Google Pixel 10 Pro",
  "is_default": false,
  "confirmed": false,
  "created_at": 1758480000,
  "secret": "JBSWY3DPEHPK3PXP",
  "otpauth_uri": "otpauth://totp/FinOps%20for%20Cloud:reto.mayer%40example.comsecret=JBSWY3DPEHPK3PXP&issuer=FinOps%20for%20Cloud&digits=6&period=30"
}
```

Dla `{ "type": "email" }` odpowiedź nie zawiera `secret`/`otpauth_uri`, a kod jest wysyłany na adres e-mail konta.

#### Potwierdzenie rejestracji

Żądanie

```
POST /auth/v2/users/9c2a…/mfa_methods/a1d3…/confirm
{ "code": "482913" }
```

Odpowiedź `200` — `MfaMethod` z `confirmed: true` (oraz `is_default: true`, jeśli to pierwsza metoda)

Żądanie z challenge'em:

```json
{ "code": "482913", "challenge_id": "6d2f4c0e-…" }
```

Odpowiedź `201`

```json
{ 
  "method": { 
    "id": "a1d3…",
    "type": "totp",
    "is_default": true,
    "confirmed": true, 
    "label": "…",
    "created_at": 1758480000 
  },
  "token": { 
    "token": "MDAxY…", 
    "user_id": "9c2a…", 
    "user_email": "finops.ffc@example.com", 
    "valid_until": "…",
    "created_at": "…",
    "ip": "…",
    "digest": "…"
  }
}
```

#### Aktualizacja / usunięcie metody

Żądanie

```
PATCH /auth/v2/users/9c2a…/mfa_methods/b2e4…
{ "is_default": true }
```

Odpowiedź `200` z `MfaMethod`.

Żądanie

```
DELETE /auth/v2/users/9c2a…/mfa_methods/a1d3…
```

Odpowiedź `204`.

#### Reset MFA

Żądanie

```
DELETE /auth/v2/users/9c2a…/mfa_methods
```

Odpowiedź `204`. Wszystkie metody miękko usunięte, wszystkie tokeny użytkownika skasowane, oczekujące challenge'e skonsumowane.

#### Polityki organizacji

Żądanie

```
GET /auth/v2/auth_policies?scope_type=organization&scope_id=4f1e…
```

Odpowiedź `200`

```json
[{ "scope_type": "organization", "scope_id": "4f1e…", "purpose": "mfa", "updated_at": null }]
```

#### Wymuszenie MFA w organizacji

Żądanie

```
POST /auth/v2/auth_policies
{ "scope_type": "organization", "scope_id": "4f1e…", "purpose": "mfa" }
```

Odpowiedź `201`.

```json
{ 
  "id": "c7e1…",
  "scope_type": "organization",
  "scope_id": "4f1e…", 
  "purpose": "mfa",
  "created_at": 1758480000
}
```

#### Zaprzestanie wymuszania

Żądanie

```
DELETE /auth/v2/auth_policies/c7e1…
```

Odpowiedź `204`.

# Ograniczenia

| **Ograniczenie** | **Zakres/Opis** |
| --- | --- |
| Wydawanie tokenów | Istniejący przepływ `POST /auth/v2/tokens` pozostaje bez zmian: każdy obecny klient nadal otrzymuje `201` z tokenem. Nowa gałąź zwraca `202` z challenge'em logowania wyłącznie wtedy, gdy użytkownik ma skonfigurowaną metodę MFA albo jego organizacja wymusza MFA. Challenge jest domykany drugim wywołaniem tego samego endpointu. Wydawanie tokena po `user_id` za pomocą cluster secret pozostaje nietknięte. Logowanie w ramach odzyskiwania hasła (`verification_code`) również przechodzi przez challenge, aby uniknąć możliwości obejścia |
| Samodzielna rejestracja użytkownika | Bez zmian. Rejestracja nadal zwraca token natychmiast (nie istnieje jeszcze żadna metoda MFA). MFA jest osobnym, późniejszym krokiem: baner albo zachęta po rejestracji prowadząca do Profile → Security. Wymuszenie zaczyna obowiązywać dopiero, gdy użytkownik należy do organizacji wymuszającej MFA (przy kolejnym logowaniu) |
| Odzyskiwanie dostępu do MFA | Samoobsługowo przez sekret współdzielony aplikacji uwierzytelniającej: przy rejestracji klucz do ręcznego wpisania jest pokazywany obok kodu QR wraz z zaleceniem bezpiecznego przechowania (np. w menedżerze haseł). Użytkownik odtwarza tę samą metodę na nowym urządzeniu, wpisując klucz — po stronie serwera nie jest potrzebna żadna akcja |
| Logowanie przez dostawcę zewnętrznego | Bez zmian. MFA dotyczy wyłącznie uwierzytelniania lokalnego (hasłem) |

# Szacowanie pracochłonności

TBD

# Materiały

**\<Link do nagrania na vimeo ze spotkania Design Review\>**

design-review
