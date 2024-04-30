/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  AccountRole,
  Address,
  Codec,
  Decoder,
  Encoder,
  IAccountMeta,
  IAccountSignerMeta,
  IInstruction,
  IInstructionWithAccounts,
  IInstructionWithData,
  ReadonlyAccount,
  ReadonlySignerAccount,
  TransactionSigner,
  WritableAccount,
  combineCodec,
  getStructDecoder,
  getStructEncoder,
  getU64Decoder,
  getU64Encoder,
  getU8Decoder,
  getU8Encoder,
  transformEncoder,
} from '@solana/web3.js';
import { TOKEN_PROGRAM_ADDRESS } from '../programs';
import { ResolvedAccount, getAccountMetaFactory } from '../shared';

export type BurnCheckedInstruction<
  TProgram extends string = typeof TOKEN_PROGRAM_ADDRESS,
  TAccountAccount extends string | IAccountMeta<string> = string,
  TAccountMint extends string | IAccountMeta<string> = string,
  TAccountAuthority extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountAccount extends string
        ? WritableAccount<TAccountAccount>
        : TAccountAccount,
      TAccountMint extends string
        ? WritableAccount<TAccountMint>
        : TAccountMint,
      TAccountAuthority extends string
        ? ReadonlyAccount<TAccountAuthority>
        : TAccountAuthority,
      ...TRemainingAccounts,
    ]
  >;

export type BurnCheckedInstructionData = {
  discriminator: number;
  /** The amount of tokens to burn. */
  amount: bigint;
  /** Expected number of base 10 digits to the right of the decimal place. */
  decimals: number;
};

export type BurnCheckedInstructionDataArgs = {
  /** The amount of tokens to burn. */
  amount: number | bigint;
  /** Expected number of base 10 digits to the right of the decimal place. */
  decimals: number;
};

export function getBurnCheckedInstructionDataEncoder(): Encoder<BurnCheckedInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', getU8Encoder()],
      ['amount', getU64Encoder()],
      ['decimals', getU8Encoder()],
    ]),
    (value) => ({ ...value, discriminator: 15 })
  );
}

export function getBurnCheckedInstructionDataDecoder(): Decoder<BurnCheckedInstructionData> {
  return getStructDecoder([
    ['discriminator', getU8Decoder()],
    ['amount', getU64Decoder()],
    ['decimals', getU8Decoder()],
  ]);
}

export function getBurnCheckedInstructionDataCodec(): Codec<
  BurnCheckedInstructionDataArgs,
  BurnCheckedInstructionData
> {
  return combineCodec(
    getBurnCheckedInstructionDataEncoder(),
    getBurnCheckedInstructionDataDecoder()
  );
}

export type BurnCheckedInput<
  TAccountAccount extends string = string,
  TAccountMint extends string = string,
  TAccountAuthority extends string = string,
> = {
  /** The account to burn from. */
  account: Address<TAccountAccount>;
  /** The token mint. */
  mint: Address<TAccountMint>;
  /** The account's owner/delegate or its multisignature account. */
  authority: Address<TAccountAuthority> | TransactionSigner<TAccountAuthority>;
  amount: BurnCheckedInstructionDataArgs['amount'];
  decimals: BurnCheckedInstructionDataArgs['decimals'];
  multiSigners?: Array<TransactionSigner>;
};

export function getBurnCheckedInstruction<
  TAccountAccount extends string,
  TAccountMint extends string,
  TAccountAuthority extends string,
>(
  input: BurnCheckedInput<TAccountAccount, TAccountMint, TAccountAuthority>
): BurnCheckedInstruction<
  typeof TOKEN_PROGRAM_ADDRESS,
  TAccountAccount,
  TAccountMint,
  (typeof input)['authority'] extends TransactionSigner<TAccountAuthority>
    ? ReadonlySignerAccount<TAccountAuthority> &
        IAccountSignerMeta<TAccountAuthority>
    : TAccountAuthority
> {
  // Program address.
  const programAddress = TOKEN_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    account: { value: input.account ?? null, isWritable: true },
    mint: { value: input.mint ?? null, isWritable: true },
    authority: { value: input.authority ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  // Remaining accounts.
  const remainingAccounts: IAccountMeta[] = (args.multiSigners ?? []).map(
    (signer) => ({
      address: signer.address,
      role: AccountRole.READONLY_SIGNER,
      signer,
    })
  );

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.account),
      getAccountMeta(accounts.mint),
      getAccountMeta(accounts.authority),
      ...remainingAccounts,
    ],
    programAddress,
    data: getBurnCheckedInstructionDataEncoder().encode(
      args as BurnCheckedInstructionDataArgs
    ),
  } as BurnCheckedInstruction<
    typeof TOKEN_PROGRAM_ADDRESS,
    TAccountAccount,
    TAccountMint,
    (typeof input)['authority'] extends TransactionSigner<TAccountAuthority>
      ? ReadonlySignerAccount<TAccountAuthority> &
          IAccountSignerMeta<TAccountAuthority>
      : TAccountAuthority
  >;

  return instruction;
}

export type ParsedBurnCheckedInstruction<
  TProgram extends string = typeof TOKEN_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** The account to burn from. */
    account: TAccountMetas[0];
    /** The token mint. */
    mint: TAccountMetas[1];
    /** The account's owner/delegate or its multisignature account. */
    authority: TAccountMetas[2];
  };
  data: BurnCheckedInstructionData;
};

export function parseBurnCheckedInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedBurnCheckedInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 3) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      account: getNextAccount(),
      mint: getNextAccount(),
      authority: getNextAccount(),
    },
    data: getBurnCheckedInstructionDataDecoder().decode(instruction.data),
  };
}