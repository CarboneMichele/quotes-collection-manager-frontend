export class Constants {
    //
    // ─── QUOTE CREATOR FORM ─────────────────────────────────────────────────────────
    //

    public static readonly QUOTE_MAX_LENGTH = 600;
    public static readonly AUTHOR_MAX_LENGTH = 25;

    //
    // ─── ERROR MESSAGES ─────────────────────────────────────────────────────────────
    //

    public static readonly ERROR_QUOTES_FETCH = 'An error occurred while fetching quotes';
    public static readonly ERROR_QUOTE_STORE = 'An error occurred while storing the new quote';
    public static readonly ERROR_SUGGESTED_QUOTE_FETCH = 'An error occurred while fetching the suggested quote';

    //
    // ─── SUCCESS MESSAGES ───────────────────────────────────────────────────────────
    //

    public static readonly SUCCESS_LOGIN = 'Successfully logged in';
    public static readonly SUCCESS_LOGOUT = 'Successfully logged out';
    public static readonly SUCCESS_CLIPBOARD = 'Copied to clipboard';
    public static readonly SUCCESS_QUOTE_STORE = 'New quote added successfully';
}
