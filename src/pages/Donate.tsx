import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// Added MapPin, Phone, Mail to the imports below
import { Copy, Check, CreditCard, Building2, Smartphone, Heart, Info, MapPin, Phone, Mail } from "lucide-react";
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
    // Updated donation link to PanxPan project page
    const donationUrl = "https://www.panxpan.com/projects/pack-dignity-unlock-potential";
    window.open(donationUrl, "_blank");
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

            {/* 1. International Payments Tab (PayPal/Card via PanxPan) */}
            <TabsContent value="international" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-primary" />
                    Donate via International Payments
                  </CardTitle>
                  <CardDescription className="text-sm text-foreground/70">
                    Secure payment via PanxPan. All major cards accepted.
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
                        You'll be redirected to our secure project page to complete the donation.
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
                          <p className="text-base font-medium">{mobileMoneyDetails.number}</p>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => copyToClipboard(mobileMoneyDetails.number, 11)}
                          >
                             {copiedIndex === 11 ? <Check className="w-3 h-3 text-primary" /> : <Copy className="w-3 h-3" />}
                          </Button>
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-1">Local: {mobileMoneyDetails.localNumber}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {/* WorldRemit Instructions */}
                    <div className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                          <span className="font-bold text-xs">WR</span>
                        </div>
                        <h4 className="font-semibold text-sm">WorldRemit</h4>
                      </div>
                      <ol className="list-decimal list-inside text-xs space-y-2 text-foreground/80">
                        <li>Download/Open WorldRemit app</li>
                        <li>Select <strong>Zimbabwe</strong> as country</li>
                        <li>Choose <strong>Mobile Money</strong> transfer</li>
                        <li>Select <strong>EcoCash</strong> as provider</li>
                        <li>Use the recipient details above</li>
                      </ol>
                    </div>

                    {/* EcoCash Instructions */}
                    <div className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          <span className="font-bold text-xs">EC</span>
                        </div>
                        <h4 className="font-semibold text-sm">EcoCash (Local)</h4>
                      </div>
                      <ol className="list-decimal list-inside text-xs space-y-2 text-foreground/80">
                        <li>Dial <strong>*151#</strong></li>
                        <li>Select <strong>Send Money</strong></li>
                        <li>Enter number: <strong>{mobileMoneyDetails.localNumber}</strong></li>
                        <li>Enter amount & confirm name is <strong>{mobileMoneyDetails.recipientName}</strong></li>
                      </ol>
                    </div>
                  </div>

                </CardContent>
              </Card>
            </TabsContent>

             {/* 4. Drop-off / Cash Tab */}
             <TabsContent value="cash" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Heart className="w-4 h-4 text-primary" />
                    Drop-off & Cash Donations
                  </CardTitle>
                  <CardDescription className="text-sm text-foreground/70">
                    Visit us to donate cash or goods in person.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted/30 p-4 rounded-lg border border-border/50">
                     <p className="text-sm text-foreground/80 mb-4">
                       We gratefully accept donations of school supplies, uniforms, sanitary wear, and non-perishable food items.
                     </p>
                     
                     <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-4 h-4 text-primary mt-1" />
                          <div>
                            <p className="text-sm font-semibold">Future Wings Foundation HQ</p>
                            <p className="text-xs text-muted-foreground">Harare, Zimbabwe</p>
                            <p className="text-xs text-muted-foreground mt-1">(Please contact us for exact directions)</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Phone className="w-4 h-4 text-primary" />
                          <p className="text-sm">+263 788 863 452</p>
                        </div>
                     </div>
                  </div>

                  <Button variant="outline" className="w-full" onClick={() => window.location.href = "mailto:alisa@futurewingsfoundation.com"}>
                    <Mail className="w-4 h-4 mr-2" />
                    Email to Schedule Drop-off
                  </Button>
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