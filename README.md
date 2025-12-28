# QuizClient
## Summary
This is the quiz client it is basically build for a particular school.
There is list of question in src/assets/mybody-en.json or mybody-ur.json
Note: Both the json must match.

## Storing the public key
Each school data is encrypted using public key of that school that is maintained
separately. The public key of the school is entered in file: encrption.service.ts

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

## Encrypt using public key of school.
The answers are submitted using mail. In order to preserve the sanity
We encrypt the answer with the public key of the school before submission.
We uncomment the following function in file: result.component.ts
If we want to enable the mail or else comments to close the submission.

        OnSubmit() {
            alert('Submission is closed now!')
            // this.quizService.submitScore().subscribe(async (data: any) => {
            //   //this.restart();
            //   this.isResultSubmitted = true;
            //   try {
            //     const encryptedData = await this.encryptionService.encryptResults(data);
            //     console.log('Encrypted Data:', encryptedData);

            //     // Send the encrypted data via email or other methods
            //     this.sendEmail(encryptedData);
            //   } catch (error) {
            //     console.error('Error encrypting data:', error);
            //   }
            // });
        }

## Building the component.
THe component is build for particular school and hosted for them.
