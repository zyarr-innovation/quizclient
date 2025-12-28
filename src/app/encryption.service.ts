import { Injectable } from '@angular/core';
import * as openpgp from 'openpgp';

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  async encryptResults(results: any): Promise<string> {
    const publicKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----

xjMEZ10TaBYJKwYBBAHaRw8BAQdAB5KiWwzKb0aRMlztS34jwkV92GQqDruw
N6Gmp0FCU17NU3p5LWlubm92YXRvciAoVGhpcyBrZXkgaXMgdXNlZCBmb3Ig
TW9taW4gZ2lybCBNeUJvZHkgUXVpeikgPHp5LWlubm92YXRvckBnbWFpbC5j
b20+wsATBBMWCgCFBYJnXRNoAwsJBwmQh1V9QHVWYQtFFAAAAAAAHAAgc2Fs
dEBub3RhdGlvbnMub3BlbnBncGpzLm9yZ1rHAx4ZVmBmwFV+6I66LnaL4MQZ
AZELsRoCMQQvL8eEBRUKCA4MBBYAAgECGQECmwMCHgEWIQQLEsckvKot+6zp
SGOHVX1AdVZhCwAAZlEA/1QE+AAijjRkinb96zm33sLsaCKwJ8SWPqfNjnfR
4IPGAQCPMtDNvb6UlQPFJle80fKw6HWlt9wKVtU+xwE+gzX0Bc44BGddE2gS
CisGAQQBl1UBBQEBB0AunCba90S5W382MHNVewzyuyd27QXkAiPZjFtI6hmf
PQMBCAfCvgQYFgoAcAWCZ10TaAmQh1V9QHVWYQtFFAAAAAAAHAAgc2FsdEBu
b3RhdGlvbnMub3BlbnBncGpzLm9yZ8dgH3LBOJgBDdfH7v9vUky9vvSh5S/i
pSEkJ0PKeNoxApsMFiEECxLHJLyqLfus6Uhjh1V9QHVWYQsAABNJAP42bQog
uh6koVW2PLikJ1sd5gGFNZrE0GacM2/28jS7zAEAvBqxlK0avz451XcfZqw2
i9TfeylaO06uYB1a2lkR8Q4=1234567890
=otG/

-----END PGP PUBLIC KEY BLOCK-----`;

    // Read the public key
    const publicKeys = await openpgp.readKey({ armoredKey: publicKey });

    // Encrypt the results
    const message = await openpgp.createMessage({ text: JSON.stringify(results) });
    const encrypted = await openpgp.encrypt({
      message: message,
      encryptionKeys: publicKeys,
    });

    return encrypted; // This is the encrypted result
  }
}
