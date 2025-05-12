import re
import string


class PasswordValidator:
    def __init__(self):
        self.min_length = 4
        self.min_lowercase = 0
        self.min_uppercase = 0
        self.min_digits = 0
        self.min_special_chars = 0

    def change_settings(self, **settings):
        for k in ['min_length', 'min_lowercase', 'min_uppercase', 'min_digits',
                  'min_special_chars']:
            if k in settings:
                value = settings[k]
                if isinstance(value, int) or value.isdigit():
                    int_value = int(value)
                    if int_value > getattr(self, k):
                        setattr(self, k,  int_value)

    def validate(self, password):
        if not isinstance(password, str):
            raise ValueError(f"Password must be a string")
        if len(password) < self.min_length:
            raise ValueError(f"Password must be at least {self.min_length} "
                             f"characters long")
        if self.min_lowercase and len(
                re.findall(r"[a-z]", password)) < self.min_lowercase:
            raise ValueError(
                f"Password must contain at least {self.min_lowercase} "
                f"lowercase letter{'s'[:self.min_lowercase^1]}")
        if self.min_uppercase and len(
                re.findall(r"[A-Z]", password)) < self.min_uppercase:
            raise ValueError(
                f"Password must contain at least {self.min_uppercase} "
                f"uppercase letter{'s'[:self.min_uppercase ^ 1]}")
        if self.min_digits and len(
                re.findall(r"\d", password)) < self.min_digits:
            raise ValueError(
                f"Password must contain at least {self.min_digits} "
                f"digit{'s'[:self.min_digits ^ 1]}")
        if self.min_special_chars and len(
                re.findall(f"[" + string.punctuation + "]", password)
        ) < self.min_special_chars:
            raise ValueError(
                f"Password must contain at least {self.min_special_chars} "
                f"special char{'s'[:self.min_special_chars ^ 1]}")
