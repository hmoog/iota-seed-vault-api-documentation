import { Client } from 'iota-seed-vault';

/**
 * Initialize the variables containing both of our seeds.
 *
 * IMPORTANT: - make an offline backup of both of our seeds and only store one seed in the vault
 *            - keep the other seed locally so even if the vault would get hacked, the hackers will
 *              never be able to access our multi-sig wallet
 *            - after the shared seed is stored in the vault it is removed from the local computer
 *              so even if the computer is hacked or infected with a key logger - the funds are safe
 */
const privateSeed = 'A9....7';
const sharedSeed = 'F9....8';

/**
 * Generate a unique id that identifies our wallet.
 *
 * This should be reproduceable based on both of our seeds so we can use the same wallet id
 * whenever we re-setup our wallet on a different device or to allow us to overwrite our
 * two-factor-auth secret in case our devices storing these information get stolen.
 */
const walletId = SHA256(privateSeed + sharedSeed);

/**
 * Store the shared seed in the vault and retrieve the newly generated two-factor-auth details.
 *
 * return {
 *     // the wallet id that was used to store this seed
 *     walletId: <string>,
 *
 *     // two-factor-auth secret (for manual setup with apps like google authenticator)
 *     twoFactorAuthSecret: <string>,
 *
 *     // data url with an image of the qr-code (compatible with google authenticator)
 *     qrcode: <string>
 * }
 *
 * IMPORTANT: This overwrites the old two-factor-auth secret (if we previously stored it already)
 *            so it allows us to "reset" the details if we ever forget them our our two-factor-auth
 *            device get's stolen (requires knowledge of the shared seed and the walletId - so no
 *            3rd party can overwrite these details).
 */
const twoFactorAuthDetails = await Client.storeSeed(walletId, sharedSeed)

/**
 * Create a bundle with the iota.lib.js and sign it with our local seed.
 */
bundleSignedWithLocalSeed = ...

/**
 * Signs the bundle with the
 */
const bundleSignedWithBothSeeds = Client.signBundle(walletId, bundleSignedWithLocalSeed, [{}]);

/*