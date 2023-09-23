import { DateTime } from "luxon";
import * as crypto from "crypto";
import axios, { AxiosError } from "axios";
import { getUniqId } from "../helper/function/getUniqId";
import { UnprocessableEntityException } from "../helper/Error/UnprocessableEntity/UnprocessableEntityException";

export default class DokuService {
  async generatePaymentCode() {
    try {
      const payload = {
        order: {
          invoice_number: "INV-20210124-0001",
          amount: 150000,
        },
        virtual_account_info: {
          billing_type: "FIX_BILL",
          expired_time: 60,
          reusable_status: false,
          info1: "Merchant Demo Store",
          info2: "Thank you for shopping",
          info3: "on our store",
        },
        customer: {
          name: "Anton Budiman",
          email: "anton@example.com",
        },
      };
      console.log("payload", payload);
      const paymentUrl =
        "https://api-sandbox.doku.com/bca-virtual-account/v2/payment-code";
      console.log("paymentUrl", paymentUrl);
      const timestamp = DateTime.utc().toISO()?.toString();
      console.log("timestamp", timestamp);
      const digest = await this.generateDigest2(payload);
      console.log("digest", digest);
      const secretKey = "SK-7WH5ubv2ga7SWwFhkh29"; // Replace with your actual secret key
      console.log("secretKey", secretKey);
      const requestId =
        "BNI_VA" +
        getUniqId({
          length: 32,
        });
      console.log("requestId", requestId);
      //   const signatureComponents = [
      //     `Client-Id:BRN-0206-1695445608025`,
      //     `Request-Id:${requestId}}`,
      //     `Request-Timestamp:${timestamp}`,
      //     `Request-Target:/bni-virtual-account/v2/payment-code`,
      //     `Digest:${digest}`,
      //   ];
      //   const signatureString = signatureComponents.join("\n");
      let signatureString = `Client-Id:BRN-0206-1695445608025\nRequest-Id:${requestId}\nRequest-Timestamp:${timestamp}\nRequest-Target:/bca-virtual-account/v2/payment-code\nDigest:${digest}`;
      console.log("signatureString", { string: signatureString });
      const hmac = crypto.createHmac("sha256", secretKey);
      hmac.update(signatureString);
      const signature = `HMACSHA256=${hmac.digest("base64")}`;
      console.log("signature", signature);

      const headers = {
        "Content-Type": "application/json",
        "Client-Id": "BRN-0206-1695445608025",
        "Request-Id": requestId,
        "Request-Timestamp": timestamp,
        Signature: signature,
      };
      console.log("headers", JSON.stringify(headers));
      const result = await axios.post(paymentUrl, JSON.stringify(payload), {
        headers,
      });
      console.log("result", result.data);
      return result.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const err = error as AxiosError;
        console.log("ERROR STATUS", err.response?.status);
        throw new UnprocessableEntityException(
          "Error when generate payment code",
          err.response?.data
        );
      }
      throw error;
    }

    //end of method
  }

  async generateDigest(payload: any): Promise<string | null> {
    try {
      // Convert the payload JSON object to a string
      const payloadString = JSON.stringify(payload);

      // Calculate the SHA256 hash
      const sha256Hash = crypto
        .createHash("sha256")
        .update(payloadString)
        .digest();

      // Convert the hash to base64
      const base64Hash = sha256Hash.toString("base64");

      return base64Hash;
    } catch (error) {
      // Handle any errors that might occur during the process
      console.error("Error generating Digest:", error);
      return null;
    }
  }
  async generateDigest2(jsonBody: any) {
    //jsonBody = '{\"order\":{\"invoice_number\":\"INV-20210118-0001\",\"amount\":90000,\"line_items\":[{\"name\":\"T-Shirt Red\",\"price\":30000,\"quantity\":2},{\"name\":\"Polo Navy\",\"price\":30000,\"quantity\":1}],\"callback_url\":\"https://aop-b2c.atlantica.dev/\",\"failed_url\":\"https://aop-b2c.atlantica.dev/\",\"auto_redirect\":false},\"card\":{\"token\":\"a55b8d8df709607d2a343778898f41d0\",\"save\":false},\"customer\":{\"id\":\"CUST-0001\",\"name\":\"Anton Budiman\",\"email\":\"anton@example.com\",\"phone\":\"6285694566147\",\"address\":\"Menara Mulia Lantai 8\",\"country\":\"ID\"},\"override_configuration\":{\"themes\":{\"language\":\"EN\",\"background_color\":\"F5F8FB\",\"font_color\":\"1A1A1A\",\"button_background_color\":\"E1251B\",\"button_font_color\":\"FFFFFF\"}}}'
    let jsonStringHash256 = crypto
      .createHash("sha256")
      .update(JSON.stringify(jsonBody), "utf8")
      .digest();

    let bufferFromJsonStringHash256 = Buffer.from(jsonStringHash256);
    return bufferFromJsonStringHash256.toString("base64");
  }
}
