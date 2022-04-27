package com.example.springjwt.models;

import java.util.ArrayList;
import java.util.List;

public enum ECryptocurrency {

    BITCOIN("Bitcoin", "BTC", "Qwsogvtv82FCd", "1"),
    ETHEREUM("Ethereum", "ETH", "razxDUgYGNAdQ", "2"),
    BINANCE_COIN("Binance Coin", "BNB", "WcwrkfNI4FUAe", "14"),
    SOLANA("Solana", "SOL", "zNZHO_Sjf", "68905"),
    TETHER("Tether USD", "USDT", "HIVsRcGKkPFtW", "8"),
    CARDANO("Cardano", "ADA", "qzawljRxB5bYu", "9"),
    POLKADOT("Polkadot", "DOT", "25W7FG7om", "71983"),
    XRP("XRP", "XRP", "-l8Mn2pVlRs-p", "3"),
    TERRA("Terra", "LUNA*", "AaQUAs2Mc", "62458"),
    HEX("HEX", "HEX", "9K7m6ufraZ6gh", "5331"),
    DOGECOIN("Dogecoin", "DOGE", "a91GCGd_u96cF", "20"),
    SHIBA_INU("SHIBA INU", "SHIB", "xz24e0BjL", "72724"),
    USDC("USDC", "USDC", "aKzUVe4Hh_CON", "1760"),
    AVALANCHE("Avalanche", "AVAX", "dvUj0CzDZ", "70974"),
    UNISWAP("Uniswap", "UNI", "_H5FVG9iW", "72821"),
    LITECOIN("Litecoin", "LTC", "D7B1x_ks7WhV5", "7"),
    CHAINLINK("Chainlink", "LINK", "VLqpJwogdhHNb", "59"),
    WRAPPED_BTC("Wrapped BTC", "WBTC", "x4WXHge-vvFY", "10607"),
    BINANCE_USD("Binance USD", "BUSD", "vSo2fu9iE1s0Y", "14066"),
    POLYGON("Polygon", "MATIC", "uW2tk-ILY0ii", "12606"),
    BITCOIN_CASH("Bitcoin Cash", "BCH", "ZlZpzOJo43mIo", "4"),
    VECHAIN("VeChain", "VET", "FEbS54wxo4oIl", "19"),
    ALGORAND("Algorand", "ALGO", "TpHE2IShQw-sJ", "14585"),
    COSMOS("Cosmos", "ATOM", "Knsels4_Ol-Ny", "4966"),
    INTERNET_COMPUTER_DFINITY("Internet Computer (DFINITY)", "ICP", "aMNLwaUbY", "73728"),
    AXIE_INFINITY("Axie Infinity", "AXS", "gpRKmM16k", "76192"),
    FTX_TOKEN("FTX Token", "FTT", "NfeOYfNcl", "62569"),
    DAI("Dai", "DAI", "MoTuySvg7", "68589"),
    OKB("OKB", "OKB", "PDKcptVnzJTmN", "1524"),
    THETA_TOKEN("Theta Token", "THETA", "B42IRxNtoYmwK", "96"),
    CRYPTO_COM_CHAIN("Crypto.com Chain", "CRO", "65PHZTpmE55b", "10296"),
    PANCAKESWAP("PancakeSwap", "CAKE", "ncYFcP709", "73268"),
    COMPOUND_ETHER("Compound Ether", "CETH", "p_GHkOeDNKw0", "10825"),
    STELLAR("Stellar", "XLM", "f3iaFeCKEmkaZ", "6"),
    TRON("TRON", "TRX", "qUhEFk1I61atv", "11"),
    ETHEREUM_CLASSIC("Ethereum Classic", "ETC", "hnfQfsYfeIGUQ", "16"),
    ONE_INCH_TOKEN("1inch Token", "1INCH", "lD9digIOk", "78164"),
    DECENTRALAND("Decentraland", "MANA", "tEf7-dnwV3BXS", "77"),
    FILECOIN("Filecoin", "FIL", "ymQub4fuB", "74500"),
    TEZOS("Tezos", "XTZ", "fsIbGOEJWbzxG", "18"),
    ELROND("Elrond", "EGLD", "omwkOTglq", "72208"),
    HELIUM("Helium", "HNT", "rGDiacWtB", "62765"),
    MONERO("Monero", "XMR", "3mVx2FX_iJFp5", "10"),
    EOS("EOS", "EOS", "iAzbfXiBBKkR6", "5"),
    AMP("AMP", "AMP***", "7oCgI0fI3", "77558"),
    HEDERA_HASHGRAPH("Hedera HashGraph", "HBAR", "jad286TjB", "63100"),
    AAVE("Aave", "AAVE", "ixgUfzmLR", "74883"),
    COMPOUND_DAI("Compound Dai", "CDAI", "lT__vMO7l", "66208"),
    KUSAMA("Kusama", "KSM", "ePlOuwd_e", "57612"),
    SAFEMOON("SafeMoon", "SAFEMOON", "7gHjBh7YK", "80667"),
    KLAYTN("Klaytn", "KLAY", "M9bj_WrX", "63279"),
    WOOTRADE("Wootrade", "WOO*", "k-J3YwacF", "91551"),
    IOTA("IOTA", "MIOTA", "LtWwuVANwRzV_", "12"),
    OLYMPUS("Olympus", "OHM*", "TYvlooNC_", "91443"),
    ECASH("eCash", "XEC", "aQx_vW8s1", "94180"),
    NEO("NEO", "NEO", "cVaOmQWainv7g", "15"),
    LUXURIOUS_PRO_NETWORK_TOKEN("Luxurious Pro Network Token", "LPNT", "PcFhLcWtO", "79597"),
    THORCHAIN("THORChain", "RUNE", "ybmU-kKU", "64725"),
    THE_GRAPH("The Graph", "GRT", "qhd1biQ7M", "78340"),
    NEAR_PROTOCOL("NEAR Protocol", "NEAR", "DCrsaMv68", "73429"),
    BITCOIN_SV("Bitcoin SV", "BSV", "VcMY11NONHSA0", "4875"),
    ARWEAVE("Arweave", "AR", "7XWg41D1", "67129"),
    MAKER("Maker", "MKR", "qFakph2rpuMOL", "22"),
    LEO("LEO", "LEO", "mqtUpyBxu8O8", "14755"),
    MOBILECOIN("MobileCoin", "MOB", "IMmiXaCp0", "77506"),
    LIDO_DAO_TOKEN("Lido DAO Token", "LDO", "Pe93bIOD2", "78547"),
    SUSHI("SUSHI", "SUSHI", "ql3Jj4Tge", "72103"),
    CELSIUS_NETWORK("Celsius Network", "CEL", "rk5XwL6mIjUDp", "4303"),
    CHILIZ("Chiliz", "CHZ", "GSCt2y6YSgO26", "14836"),
    WAVES("Waves", "WAVES", "J8xX4Fc9PxEat", "43"),
    HUOBI_BTC("Huobi BTC", "HBTC", "upmyKdAQ", "67535"),
    BITTORRENT("BitTorrent", "BTT*", "3cx3h5-CGPD4", "10463"),
    HOLO("Holo", "HOT*", "iEHCPwcxoIH8e", "51"),
    QUANT("Quant", "QNT", "bauj_21eYVwso", "296"),
    ENJIN_COIN("Enjin Coin", "ENJ", "hG9iQlgtdwCvc", "126"),
    DASH("Dash", "DASH", "C9DwH-T7MEGmo", "13"),
    OMG_NETWORK("OMG Network", "OMG", "_tpssiAXwrHfr", "24"),
    ZCASH("Zcash", "ZEC", "aRGRWLf2RYNq4", "21"),
    THE_SANDBOX("The Sandbox", "SAND*", "pxtKbG5rg", "79913"),
    COMPOUND("Compound", "COMP", "7Dg6y_Ywg", "70838"),
    NEXO("Nexo", "NEXO", "Hi6jNXshVh9FA", "99"),
    TERRAUSD("TerraUSD", "UST***", "cKExCczgV", "79503"),
    BLOCKSTACK("Blockstack", "STX**", "mMPrMcB7", "64375"),
    THETA_FUEL("Theta Fuel", "TFUEL", "11H-TGR7543X", "11515"),
    SYNTHETIX_NETWORK("Synthetix Network", "SNX", "sgxZRXbK0FDc", "10883"),
    ONE("One", "ONE*", "6Lga5NiXX3rT", "11389"),
    CURVE_DAO_TOKEN("Curve DAO Token", "CRV", "QGbUTVMjG", "71764"),
    WAX_ECONOMIC_TOKEN("WAX Economic Token", "WAXE", "Zn0_0EpSb", "78278"),
    LOOPRING("Loopring", "LRC", "Au8mNo2ZIlJfL", "72"),
    QTUM("QTUM", "QTUM", "bOm0xKUuDvCUu", "29"),
    BASIC_ATTENTION_TOKEN("Basic Attention Token", "BAT", "pOnT-qfd-RN7W", "46"),
    KUCOIN_TOKEN("KuCoin Token", "KCS", "LOO6LmXd7G84Z", "62"),
    HUOBI_TOKEN("Huobi Token", "HT", "DXwP4wF9ksbBO", "71"),
    E_RADIX("e-RADIX", "EXRD", "59T2mLvO2", "74019"),
    SKALE("SKALE", "SKL", "jZyh6ZQup", "73297"),
    RALLY("Rally", "RLY", "ymrUBSLfa", "74532"),
    DECRED("Decred", "DCR", "1wJlqkxIpJKLN", "28"),
    NEM("NEM", "XEM", "DZtb-6X8yCx0h", "17"),
    ZILLIQA("Zilliqa", "ZIL", "3jmxrjOJ8xa4p", "34"),
    RAVENCOIN("Ravencoin", "RVN", "Ru56fDlLB56-v", "125");

    private static final List<String> UUID_LIST = new ArrayList<>();
    private static final List<String> ID_LIST = new ArrayList<>();

    static {
        for (ECryptocurrency c : values()) {
            UUID_LIST.add(c.uuid);
            ID_LIST.add(c.id);
        }
    }

    public final String label;
    public final String symbol;
    public final String uuid;
    public final String id;

    ECryptocurrency(String label, String symbol, String uuid, String id) {
        this.label = label;
        this.symbol = symbol;
        this.uuid = uuid;
        this.id = id;
    }

    public static List<String> uuidValues() {
        return UUID_LIST;
    }

    public static ECryptocurrency getById(String id) {
        for (ECryptocurrency c : values()) {
            if (c.id.equals(id)) {
                return c;
            }
        }
        return null;
    }

    public static List<String> idValues() {
        return ID_LIST;
    }

}