import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Copy, Check, CreditCard, Building2, Smartphone, Heart, Info, Mail, MapPin, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Donate = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [donationAmount, setDonationAmount] = useState("");
  const [selectedTab, setSelectedTab] = useState("international");
  
  // State for the inner banking tab (Local/International)
  const [selectedBankType, setSelectedBankType] = useState("local"); 

  // BANKING DATA
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

  const selectedBank = banks.find(bank => bank.type === selectedBankType) || banks[0];

  // Shared details for WorldRemit & EcoCash
  const mobileMoneyDetails = {
    recipientName: "Alisa Adams",
    number: "+263 788 863 452",
    localNumber: "0788 863 452"
  };

  const quickAmounts = [25, 50, 100, 250, 500, 1000];

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handlePayPalDonate = () => {
    // Replace with actual PayPal donation link
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
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6 h-auto">
              <TabsTrigger value="international" className="text-sm py-3">
                <CreditCard className="w-4 h-4 mr-2" />
                International
              </TabsTrigger>
              <TabsTrigger value="bank" className="text-sm py-3">
                <Building2 className="w-4 h-4 mr-2" />
                Bank Transfer
              </TabsTrigger>
              <TabsTrigger value="remit" className="text-sm py-3">
                <Smartphone className="w-4 h-4 mr-2" />
                WorldRemit / EcoCash
              </TabsTrigger>
              <TabsTrigger value="cash" className="text-sm py-3">
                <Heart className="w-4 h-4 mr-2" />
                Drop-off / Cash
              </TabsTrigger>
            </TabsList>

            {/* 1. International Payments Tab (PayPal) */}
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
                        You'll be redirected to PayPal's secure payment page.
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

            {/* 2. Bank Transfers Tab */}
            <TabsContent value="bank" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-primary" />
                    Bank Transfer Details
                  </CardTitle>
                  <CardDescription className="text-sm text-foreground/70">
                    Direct transfer. Select local or international.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Tabs value={selectedBankType} onValueChange={setSelectedBankType}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="local" className="text-sm">
                    Local (Nedbank)
                  </TabsTrigger>
                  <TabsTrigger value="international" className="text-sm">
                    International (ING)
                  </TabsTrigger>
                </TabsList>

                <TabsContent value={selectedBankType} className="space-y-4 pt-4">
                  <h3 className="text-xl font-bold text-foreground">{selectedBank.name}</h3>

                  <Card className="border">
                    <CardContent className="space-y-0 p-0">
                      {/* Account Name */}
                      <div className="flex justify-between items-center p-4 border-b border-border/50">
                        <Label className="text-xs font-semibold text-foreground/70">Account Name</Label>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-foreground">{selectedBank.accountName}</p>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => copyToClipboard(selectedBank.accountName, 1)}
                          >
                            {copiedIndex === 1 ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
                          </Button>
                        </div>
                      </div>

                      {/* Account Number */}
                      <div className="flex justify-between items-center p-4 border-b border-border/50">
                        <Label className="text-xs font-semibold text-foreground/70">{selectedBank.accountNumberLabel}</Label>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-mono font-medium text-foreground">{selectedBank.accountNumber}</p>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => copyToClipboard(selectedBank.accountNumber, 2)}
                          >
                            {copiedIndex === 2 ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
                          </Button>
                        </div>
                      </div>

                      {/* SWIFT */}
                      <div className="flex justify-between items-center p-4 border-b border-border/50">
                        <Label className="text-xs font-semibold text-foreground/70">SWIFT Code</Label>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-mono font-medium text-foreground">{selectedBank.swiftCode}</p>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => copyToClipboard(selectedBank.swiftCode, 3)}
                          >
                            {copiedIndex === 3 ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
                          </Button>
                        </div>
                      </div>
                      
                      {/* BIC (If exists) */}
                      {selectedBank.bic && (
                        <div className="flex justify-between items-center p-4">
                          <Label className="text-xs font-semibold text-foreground/70">BIC Code</Label>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-mono font-medium text-foreground">{selectedBank.bic}</p>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => copyToClipboard(selectedBank.bic, 4)}
                            >
                              {copiedIndex === 4 ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground px-1">
                    <Info className="w-3 h-3" />
                    <p>{selectedBank.notes}</p>
                  </div>
                </TabsContent>
              </Tabs>
            </TabsContent>

            {/* 3. WorldRemit & EcoCash Tab - COMBINED */}
            <TabsContent value="remit" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-primary" />
                    WorldRemit & EcoCash
                  </CardTitle>
                  <CardDescription className="text-sm text-foreground/70">
                    Send money via WorldRemit or locally using EcoCash. Both use the same recipient details.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  {/* Recipient Details Card */}
                  <div className="bg-primary/5 border border-primary/10 rounded-lg p-4">
                    <h4 className="text-sm font-bold text-primary mb-3 uppercase tracking-wide">Recipient Details</h4>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label className="text-xs text-muted-foreground">Recipient Name</Label>
                        <div className="flex items-center gap-2">
                          <p className="text-base font-medium">{mobileMoneyDetails.recipientName}</p>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => copyToClipboard(mobileMoneyDetails.recipientName, 10)}
                          >
                             {copiedIndex === 10 ? <Check className="w-3 h-3 text-primary" /> : <Copy className="w-3 h-3" />}
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Mobile Number</Label>
                        <div className="flex items-center gap-2">
                          <p className="text-base font-mono font-medium">{mobileMoneyDetails.number}</p>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => copyToClipboard(mobileMoneyDetails.number, 11)}
                          >
                             {copiedIndex === 11 ? <Check className="w-3 h-3 text-primary" /> : <Copy className="w-3 h-3" />}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* EcoCash Steps */}
                    <div className="space-y-3">
                      <h4 className="font-semibold flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs">1</span>
                        EcoCash (Local)
                      </h4>
                      <div className="bg-card border rounded-lg p-4 text-sm space-y-2 shadow-sm">
                        <p className="font-medium text-foreground/80">Dial *151#</p>
                        {/* Changed text-muted-foreground to text-foreground for visibility */}
                        <ol className="list-decimal list-inside space-y-1.5 text-foreground ml-1">
                          <li>Select <span className="font-medium">Send Money</span></li>
                          <li>Select <span className="font-medium">Send to Registered Customer</span></li>
                          <li>Enter Number: <span className="font-mono select-all">{mobileMoneyDetails.localNumber}</span></li>
                          <li>Enter Amount</li>
                          <li>Confirm Name: <span className="font-medium text-primary">{mobileMoneyDetails.recipientName}</span></li>
                        </ol>
                      </div>
                    </div>

                    {/* WorldRemit Steps */}
                    <div className="space-y-3">
                      <h4 className="font-semibold flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs">2</span>
                        WorldRemit (International)
                      </h4>
                      <div className="bg-card border rounded-lg p-4 text-sm space-y-2 shadow-sm">
                        <p className="text-foreground/80">Open the WorldRemit App or Website:</p>
                        {/* Changed text-muted-foreground to text-foreground for visibility */}
                        <ul className="list-disc list-inside space-y-1.5 text-foreground ml-1">
                          <li>Select Country: <span className="font-medium">Zimbabwe</span></li>
                          <li>Select Service: <span className="font-medium">Mobile Money (EcoCash)</span> or <span className="font-medium">Cash Pickup</span></li>
                          <li>Enter Amount</li>
                          <li>Recipient: <span className="font-medium text-primary">{mobileMoneyDetails.recipientName}</span></li>
                          <li>Mobile: <span className="font-mono select-all">{mobileMoneyDetails.number}</span></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                </CardContent>
              </Card>
            </TabsContent>

            {/* 4. Cash / Drop-off Tab */}
            <TabsContent value="cash" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    Drop-off / Cash Donations
                  </CardTitle>
                  <CardDescription className="text-sm text-foreground/70">
                    You can drop off cash or physical goods (clothing, pads, books) at our office.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="bg-muted/30 border rounded-lg p-6 text-center">
                      <h4 className="font-semibold mb-2">Visit Us In Harare</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Please contact us first to schedule a drop-off to ensure someone is available to receive your donation.
                      </p>
                      <div className="flex flex-col items-center gap-2 text-sm font-medium">
                        <div className="flex items-center gap-2">
                           <Phone className="w-4 h-4 text-primary" />
                           <span>+263 788 863 452</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <Mail className="w-4 h-4 text-primary" />
                           <span>alisa@futurewingsfoundation.com</span>
                        </div>
                      </div>
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