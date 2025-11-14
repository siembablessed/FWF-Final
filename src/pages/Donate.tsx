import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Copy, Check, CreditCard, Building2, Smartphone, Heart, Info, Mail } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Donate = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [donationAmount, setDonationAmount] = useState("");
  const [selectedTab, setSelectedTab] = useState("international");
  
  // NEW STATE: To track the inner banking tab (Local/International)
  const [selectedBankType, setSelectedBankType] = useState("local"); 

  // UPDATED BANKING DATA STRUCTURE
  const banks = [
    {
      name: "Nedbank Zimbabwe",
      type: "local",
      accountNumberLabel: "Account Number",
      accountNumber: "11992386586",
      accountName: "Alisa Adams",
      branch: "Nedbank",
      swiftCode: "MBCAZWHX",
      bic: "18101",
      notes: "Local Zimbabwean transfers should use this option.",
    },
    {
      name: "ING Netherlands",
      type: "international",
      accountNumberLabel: "IBAN/Account Number",
      accountNumber: "NL35INGB0794252850",
      accountName: "Alisa Adams",
      branch: "ING",
      swiftCode: "INGBNL2A",
      bic: null,
      notes: "Use this for transfers from outside Zimbabwe (International).",
    },
  ];

  // FIND CURRENTLY SELECTED BANK DETAILS
  const selectedBank = banks.find(bank => bank.type === selectedBankType) || banks[0];

  const ecocashNumber = "+263 788 123 456"; // Retaining for copyToClipboard placeholder but not used in layout
  const quickAmounts = [25, 50, 100, 250, 500, 1000];

  // Ensure copyToClipboard index is unique across all dynamic fields (using 1, 2, 3, 4)
  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handlePayPalDonate = () => {
    // Replace with your actual PayPal donation link
    const paypalUrl = `https://www.paypal.com/donate?hosted_button_id=YOUR_BUTTON_ID&amount=${donationAmount || 0}`;
    window.open(paypalUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Minimal Hero Section */}
      <section className="py-12 md:py-16 px-4 border-b border-border">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <Heart className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Make a Difference
          </h1>
          <p className="text-base text-foreground/70 max-w-xl mx-auto">
            Your donation helps us provide education and support to children in need. Every contribution makes an impact.
          </p>
        </div>
      </section>

      {/* Donation Options */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Choose Payment Method
            </h2>
            <p className="text-sm text-foreground/70">
              Select the option that works best for you
            </p>
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="international" className="text-sm">
                <CreditCard className="w-4 h-4 mr-2" />
                International Payments
              </TabsTrigger>
              <TabsTrigger value="bank" className="text-sm">
                <Building2 className="w-4 h-4 mr-2" />
                Bank Transfers
              </TabsTrigger>
              <TabsTrigger value="worldremit" className="text-sm">
                <Smartphone className="w-4 h-4 mr-2" />
                WorldRemit
              </TabsTrigger>
              <TabsTrigger value="cash" className="text-sm">
                <Heart className="w-4 h-4 mr-2" />
                Cash
              </TabsTrigger>
            </TabsList>

            {/* International Payments Tab (formerly PayPal) */}
            <TabsContent value="international" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-primary" />
                    Donate via International Payments (PayPal)
                  </CardTitle>
                  <CardDescription className="text-sm text-foreground/70">
                    Secure payment with PayPal. All major cards accepted.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount" className="text-sm">Donation Amount (USD)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                      min="1"
                      step="0.01"
                      className="h-10"
                    />

                    {/* Quick Amount Buttons */}
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-3">
                      {quickAmounts.map((amount) => (
                        <Button
                          key={amount}
                          variant="outline"
                          size="sm"
                          onClick={() => setDonationAmount(amount.toString())}
                          className={`text-xs h-8 ${donationAmount === amount.toString()
                              ? "bg-primary text-primary-foreground border-primary"
                              : ""
                            }`}
                        >
                          ${amount}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-muted/50 p-3 rounded-md border border-border">
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-foreground/80">
                        You'll be redirected to PayPal's secure payment page. All major credit cards, debit cards, and PayPal accounts accepted.
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={handlePayPalDonate}
                    className="w-full"
                    variant="rounded"
                    disabled={!donationAmount || parseFloat(donationAmount) <= 0}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Donate ${donationAmount || "0"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Bank Transfers Tab - MAJOR MODIFICATION */}
            <TabsContent value="bank" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-primary" />
                    Bank Transfer Details
                  </CardTitle>
                  <CardDescription className="text-sm text-foreground/70">
                    Transfer funds directly to our account. Select whether your transfer is local (Zimbabwean) or international.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Inner Tab for Local/International */}
              <Tabs value={selectedBankType} onValueChange={setSelectedBankType}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="local" className="text-sm">
                    Local (Nedbank Zimbabwe)
                  </TabsTrigger>
                  <TabsTrigger value="international" className="text-sm">
                    International (ING Netherlands)
                  </TabsTrigger>
                </TabsList>

                <TabsContent value={selectedBankType} className="space-y-4 pt-4">
                  
                  <h3 className="text-xl font-bold text-foreground">{selectedBank.name}</h3>

                  {/* Dynamic Bank Details Card */}
                  <Card className="border">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Account Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      
                      {/* Account Name - MODIFIED LAYOUT */}
                      <div className="flex justify-between items-center py-2 border-b border-border/50 last:border-b-0">
                        <Label className="text-xs font-semibold text-foreground/70">Account Name</Label>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-foreground">{selectedBank.accountName}</p>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => copyToClipboard(selectedBank.accountName, 1)}
                          >
                            {copiedIndex === 1 ? (
                              <Check className="w-3.5 h-3.5 text-primary" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </Button>
                        </div>
                      </div>

                      {/* Account Number / IBAN - MODIFIED LAYOUT */}
                      <div className="flex justify-between items-center py-2 border-b border-border/50 last:border-b-0">
                        <Label className="text-xs font-semibold text-foreground/70">{selectedBank.accountNumberLabel}</Label>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-mono font-medium text-foreground">{selectedBank.accountNumber}</p>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => copyToClipboard(selectedBank.accountNumber, 2)}
                          >
                            {copiedIndex === 2 ? (
                              <Check className="w-3.5 h-3.5 text-primary" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </Button>
                        </div>
                      </div>

                      {/* Bank / Branch Name - MODIFIED LAYOUT */}
                      <div className="flex justify-between items-center py-2 border-b border-border/50 last:border-b-0">
                        <Label className="text-xs font-semibold text-foreground/70">Bank Name / Branch</Label>
                        <div className="p-0">
                          <p className="text-sm font-medium text-foreground">{selectedBank.branch}</p>
                        </div>
                      </div>

                      {/* SWIFT Code - MODIFIED LAYOUT */}
                      <div className="flex justify-between items-center py-2 border-b border-border/50 last:border-b-0">
                        <Label className="text-xs font-semibold text-foreground/70">SWIFT Code</Label>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-mono font-medium text-foreground">{selectedBank.swiftCode}</p>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => copyToClipboard(selectedBank.swiftCode, 3)}
                          >
                            {copiedIndex === 3 ? (
                              <Check className="w-3.5 h-3.5 text-primary" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </Button>
                        </div>
                      </div>
                      
                      {/* BIC Code (Conditional) - MODIFIED LAYOUT */}
                      {selectedBank.bic && (
                        <div className="flex justify-between items-center py-2 border-b border-border/50 last:border-b-0">
                          <Label className="text-xs font-semibold text-foreground/70">BIC Code</Label>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-mono font-medium text-foreground">{selectedBank.bic}</p>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => copyToClipboard(selectedBank.bic, 4)}
                            >
                              {copiedIndex === 4 ? (
                                <Check className="w-3.5 h-3.5 text-primary" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </Button>
                          </div>
                        </div>
                      )}

                    </CardContent>
                  </Card>
                  
                  {/* General Note */}
                  <Card className="bg-muted/30 border">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-2">
                        <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-foreground">
                          {selectedBank.notes}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
              
              <Card className="bg-muted/30 border">
                <CardContent className="p-4">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-foreground">
                      <strong>Important:</strong> After making a bank transfer, please email confirmation to{" "}
                      <a href="mailto:alisa@futurewingsfoundation.com" className="text-primary hover:underline">
                        alisa@futurewingsfoundation.com
                      </a>{" "}
                      with your name and transaction reference.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* WorldRemit Tab (Replaces Ecocash) */}
            <TabsContent value="worldremit" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-primary" />
                    Donate via WorldRemit
                  </CardTitle>
                  <CardDescription className="text-sm text-foreground/70">
                    Send your donation using WorldRemit mobile money or bank transfer.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-muted/30 rounded-lg border">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-xs text-foreground/60 mb-2 block">Mobile Money Recipient Number</Label>
                        <div className="flex items-center gap-2 p-3 bg-background rounded border">
                          <p className="text-lg font-semibold text-foreground flex-1">0788863452</p>
                          <Button
                            variant="default"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => copyToClipboard("0788863452", 100)}
                          >
                            {copiedIndex === 100 ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <Label className="text-xs text-foreground/60 mb-2 block">Recipient Name (for Payout)</Label>
                        <div className="p-3 bg-background rounded border">
                          <p className="text-sm font-medium text-foreground">Future Wings Foundation</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Card className="border">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Info className="w-4 h-4 text-primary" />
                        How to Send via WorldRemit
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ol className="list-decimal list-inside space-y-2 text-xs text-foreground">
                        <li>Visit the WorldRemit website or use their app.</li>
                        <li>Select the destination country: **Zimbabwe**.</li>
                        <li>Choose a transfer option (e.g., Mobile Money/Cash Pickup/Bank Deposit).</li>
                        <li>Enter the recipient number **0788863452** or use our organization name.</li>
                        <li>Complete the transaction and send confirmation email.</li>
                      </ol>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Cash Tab (NO CHANGE) */}
            <TabsContent value="cash" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Heart className="w-4 h-4 text-primary" />
                    Cash Donation / Drop-off
                  </CardTitle>
                  <CardDescription className="text-sm text-foreground/70">
                    If you prefer to donate physical cash, please coordinate directly with our team for a secure drop-off.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-lg border">
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-foreground/80">
                        **Important:** Please **do not** send cash by mail. Contact us first to arrange a secure and verified drop-off or pickup.
                      </p>
                    </div>
                  </div>
                  <a href="mailto:alisa@futurewingsfoundation.com">
                    <Button 
                      className="w-full"
                      variant="rounded"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      COORDINATE DROP-OFF VIA EMAIL
                    </Button>
                  </a>
                  <div className="text-center text-sm text-foreground/70">
                    or call us at +263 788863452
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Donate;