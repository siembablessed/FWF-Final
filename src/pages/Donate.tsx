import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Copy, Check, CreditCard, Building2, Smartphone, Heart, Info } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Donate = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [donationAmount, setDonationAmount] = useState("");
  const [selectedTab, setSelectedTab] = useState("paypal");

  const banks = [
    {
      name: "First Capital Bank Zimbabwe",
      accountNumber: "1234567890123",
      accountName: "Future Wings Foundation",
      branch: "Harare Main Branch",
      swiftCode: "FCBZZWHX",
    },
    {
      name: "CBZ Bank",
      accountNumber: "9876543210987",
      accountName: "Future Wings Foundation",
      branch: "Avondale Branch",
      swiftCode: "COBZZWHX",
    },
    {
      name: "Stanbic Bank Zimbabwe",
      accountNumber: "4567890123456",
      accountName: "Future Wings Foundation",
      branch: "Samora Machel Branch",
      swiftCode: "SBICZWHX",
    },
  ];

  const ecocashNumber = "+263 788 123 456";
  const quickAmounts = [25, 50, 100, 250, 500, 1000];

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
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="paypal" className="text-sm">
                <CreditCard className="w-4 h-4 mr-2" />
                PayPal
              </TabsTrigger>
              <TabsTrigger value="bank" className="text-sm">
                <Building2 className="w-4 h-4 mr-2" />
                Bank
              </TabsTrigger>
              <TabsTrigger value="ecocash" className="text-sm">
                <Smartphone className="w-4 h-4 mr-2" />
                Ecocash
              </TabsTrigger>
            </TabsList>

            {/* PayPal Tab */}
            <TabsContent value="paypal" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-primary" />
                    Donate via PayPal
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

            {/* Bank Transfer Tab */}
            <TabsContent value="bank" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-primary" />
                    Bank Transfer Details
                  </CardTitle>
                  <CardDescription className="text-sm text-foreground/70">
                    Transfer funds directly to our account. Include your name as reference.
                  </CardDescription>
                </CardHeader>
              </Card>

              <div className="space-y-4">
                {banks.map((bank, index) => (
                  <Card key={index} className="border">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">{bank.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label className="text-xs text-foreground/60">Account Name</Label>
                          <div className="flex items-center gap-2 p-2 bg-muted/30 rounded border">
                            <p className="text-sm font-medium text-foreground flex-1">{bank.accountName}</p>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => copyToClipboard(bank.accountName, index * 10 + 1)}
                            >
                              {copiedIndex === index * 10 + 1 ? (
                                <Check className="w-3.5 h-3.5 text-primary" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-foreground/60">Account Number</Label>
                          <div className="flex items-center gap-2 p-2 bg-muted/30 rounded border">
                            <p className="text-xs font-mono font-medium text-foreground flex-1">{bank.accountNumber}</p>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => copyToClipboard(bank.accountNumber, index * 10 + 2)}
                            >
                              {copiedIndex === index * 10 + 2 ? (
                                <Check className="w-3.5 h-3.5 text-primary" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-foreground/60">Branch</Label>
                          <div className="p-2 bg-muted/30 rounded border">
                            <p className="text-sm font-medium text-foreground">{bank.branch}</p>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-foreground/60">SWIFT Code</Label>
                          <div className="flex items-center gap-2 p-2 bg-muted/30 rounded border">
                            <p className="text-xs font-mono font-medium text-foreground flex-1">{bank.swiftCode}</p>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => copyToClipboard(bank.swiftCode, index * 10 + 3)}
                            >
                              {copiedIndex === index * 10 + 3 ? (
                                <Check className="w-3.5 h-3.5 text-primary" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

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

            {/* Ecocash Tab */}
            <TabsContent value="ecocash" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-primary" />
                    Donate via Ecocash
                  </CardTitle>
                  <CardDescription className="text-sm text-foreground/70">
                    Send your donation using Ecocash mobile money transfer.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-muted/30 rounded-lg border">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-xs text-foreground/60 mb-2 block">Ecocash Number</Label>
                        <div className="flex items-center gap-2 p-3 bg-background rounded border">
                          <p className="text-lg font-semibold text-foreground flex-1">{ecocashNumber}</p>
                          <Button
                            variant="default"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => copyToClipboard(ecocashNumber, 100)}
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
                        <Label className="text-xs text-foreground/60 mb-2 block">Account Name</Label>
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
                        How to Donate via Ecocash
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ol className="list-decimal list-inside space-y-2 text-xs text-foreground">
                        <li>Dial <strong className="text-primary">*151#</strong> on your mobile phone</li>
                        <li>Select <strong>"Send Money"</strong></li>
                        <li>Enter the Ecocash number: <strong className="text-primary">{ecocashNumber}</strong></li>
                        <li>Enter the amount you wish to donate</li>
                        <li>Enter your Ecocash PIN to confirm</li>
                        <li>Save the transaction reference number</li>
                      </ol>
                    </CardContent>
                  </Card>

                  <Card className="bg-muted/30 border">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-2">
                        <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-foreground">
                          <strong>Note:</strong> After sending your donation, please email confirmation to{" "}
                          <a href="mailto:alisa@futurewingsfoundation.com" className="text-primary hover:underline">
                            alisa@futurewingsfoundation.com
                          </a>{" "}
                          with your name and transaction reference number.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Minimal Thank You Message */}
      <section className="py-12 px-4 border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <Heart className="w-6 h-6 text-primary mx-auto mb-3" />
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            Thank You
          </h2>
          <p className="text-sm text-foreground/70 max-w-lg mx-auto">
            Your support enables us to continue our mission of creating positive change in our community.
            Every donation makes a meaningful difference.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Donate;