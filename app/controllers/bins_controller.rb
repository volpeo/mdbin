class BinsController < ApplicationController
  before_action :set_bin, only: [:show, :edit, :update, :destroy]

  def show
  end

  def new
    @bin = Bin.new
  end

  def create
    @bin = Bin.new(bin_params)
    @bin.save
    redirect_to bin_path(@bin.slug)
  end

  def edit
  end

  def update
    @bin.update(bin_params)
    redirect_to bin_path(@bin.slug)
  end

  def destroy
    @bin.destroy
  end


  private

  def bin_params
    params.require(:bin).permit(:content)
  end

  def set_bin
    @bin = Bin.find_by_slug(params[:slug])
  end

end